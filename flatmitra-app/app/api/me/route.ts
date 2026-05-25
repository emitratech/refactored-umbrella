import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Fetch active lease details for the current user
    const lease = await session.db.lease.findFirst({
      where: { 
        renterId: session.user.id,
        status: "active" 
      },
      include: {
        flat: {
          include: {
            building: true,
          },
        },
      },
    });

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
      },
      lease: lease ? {
        id: lease.id,
        startDate: lease.startDate,
        endDate: lease.endDate,
        rentAmount: lease.rentAmount,
        status: lease.status,
        flat: {
          id: lease.flat.id,
          unitNumber: lease.flat.unitNumber,
          building: {
            id: lease.flat.building.id,
            name: lease.flat.building.name,
            location: lease.flat.building.location,
          }
        }
      } : null,
    });
  } catch (error) {
    console.error("GET /api/me failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile details" },
      { status: 500 }
    );
  }
}
