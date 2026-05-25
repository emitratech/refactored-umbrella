import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const buildings = await session.db.building.findMany({
      include: {
        flats: true,
      },
    });
    return NextResponse.json(buildings);
  } catch (error) {
    console.error("GET /api/buildings failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch buildings" },
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
    const { name, location } = body;

    if (!name || !location) {
      return NextResponse.json(
        { error: "Name and location are required" },
        { status: 400 }
      );
    }

    const building = await session.db.building.create({
      data: {
        tenantId: session.user.tenantId,
        name,
        location,
      },
    });
    return NextResponse.json(building);
  } catch (error) {
    console.error("POST /api/buildings failed:", error);
    return NextResponse.json(
      { error: "Failed to create building" },
      { status: 500 }
    );
  }
}
