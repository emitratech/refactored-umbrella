import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const tenants = await session.db.user.findMany({
      where: {
        role: "RENTER",
      },
      include: {
        leases: {
          include: {
            flat: {
              include: {
                building: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(tenants);
  } catch (error) {
    console.error("GET /api/tenants failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch tenants" },
      { status: 500 }
    );
  }
}
