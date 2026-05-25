import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const db = session.db;

    // 1. Total and occupied flats counts
    const flats = await db.flat.findMany();
    const totalFlats = flats.length;
    const occupiedFlats = flats.filter(f => f.status === "occupied").length;
    const vacantFlats = totalFlats - occupiedFlats;

    // 2. Urgent issues count (high priority and not resolved)
    const urgentIssues = await db.issue.count({
      where: {
        priority: "high",
        status: { not: "resolved" }
      }
    });

    // 3. Pending dues count and amount
    const pendingBills = await db.bill.findMany({
      where: { status: "pending" }
    });
    const pendingDues = pendingBills.reduce((acc, b) => acc + b.amount, 0);

    // 4. Revenue this month (paid bills)
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
    const paidBillsThisMonth = await db.bill.findMany({
      where: {
        status: "paid",
        paidAt: { gte: currentMonthStart }
      }
    });
    const revenueThisMonth = paidBillsThisMonth.reduce((acc, b) => acc + b.amount, 0);

    // 5. Recent payments feed
    const recentPaymentsRaw = await db.bill.findMany({
      where: { status: "paid" },
      orderBy: { paidAt: "desc" },
      take: 5,
      include: {
        renter: true,
        lease: {
          include: {
            flat: {
              include: {
                building: true
              }
            }
          }
        }
      }
    });

    const recentPayments = recentPaymentsRaw.map(p => {
      const names = p.renter.name.split(" ");
      const initials = names.map(n => n[0]).join("").substring(0, 2).toUpperCase();
      return {
        name: p.renter.name,
        building: p.lease?.flat?.building?.name || "Other Property",
        flat: p.lease?.flat?.unitNumber || "Flat",
        amount: `₹${p.amount.toLocaleString("en-IN")}`,
        time: p.paidAt ? new Date(p.paidAt).toLocaleDateString() : "Recently",
        initials
      };
    });

    // 6. Expenses by category
    const expenses = await db.expense.findMany();
    const maintenance = expenses.filter(e => e.category === "maintenance").reduce((acc, e) => acc + e.amount, 0);
    const salary = expenses.filter(e => e.category === "salary").reduce((acc, e) => acc + e.amount, 0);
    const utilities = expenses.filter(e => e.category === "utilities").reduce((acc, e) => acc + e.amount, 0);

    return NextResponse.json({
      revenueThisMonth,
      totalFlats,
      occupiedFlats,
      vacantFlats,
      pendingDues,
      urgentIssues,
      recentPayments,
      expenseBreakdown: {
        maintenance,
        salary,
        utilities
      }
    });
  } catch (error) {
    console.error("GET /api/dashboard failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    );
  }
}
