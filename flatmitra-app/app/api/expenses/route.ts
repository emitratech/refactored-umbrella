import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const expenses = await session.db.expense.findMany({
      include: {
        building: true,
      },
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(expenses);
  } catch (error) {
    console.error("GET /api/expenses failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
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
    const { buildingId, category, amount, date, description, receiptUrl } = body;

    if (!buildingId || !category || !amount || !date || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const expense = await session.db.expense.create({
      data: {
        tenantId: session.user.tenantId,
        buildingId,
        category,
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        receiptUrl,
      },
    });
    return NextResponse.json(expense);
  } catch (error) {
    console.error("POST /api/expenses failed:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}
