import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const db = session.db;
    const role = session.user.role;

    let bills;
    if (role === "RENTER") {
      // Renters can only see their own bills
      bills = await db.bill.findMany({
        where: {
          renterId: session.user.id,
        },
        include: {
          lease: {
            include: {
              flat: {
                include: {
                  building: true,
                },
              },
            },
          },
        },
        orderBy: {
          dueDate: "desc",
        },
      });
    } else {
      // Admins/Staff can see all bills for their tenant
      bills = await db.bill.findMany({
        include: {
          renter: true,
          lease: {
            include: {
              flat: {
                include: {
                  building: true,
                },
              },
            },
          },
        },
        orderBy: {
          dueDate: "desc",
        },
      });
    }

    return NextResponse.json(bills);
  } catch (error) {
    console.error("GET /api/bills failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { leaseId, renterId, amount, dueDate } = body;

    if (!leaseId || !renterId || !amount || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bill = await session.db.bill.create({
      data: {
        tenantId: session.user.tenantId,
        leaseId,
        renterId,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: "pending",
      },
    });
    return NextResponse.json(bill);
  } catch (error) {
    console.error("POST /api/bills failed:", error);
    return NextResponse.json(
      { error: "Failed to create bill" },
      { status: 500 }
    );
  }
}
