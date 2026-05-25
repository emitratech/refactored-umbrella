import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const issues = await session.db.issue.findMany({
      include: {
        building: true,
        flat: true,
        reporter: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(issues);
  } catch (error) {
    console.error("GET /api/issues failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { buildingId, flatId, title, description, priority } = body;

    if (!buildingId || !flatId || !title || !description || !priority) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const issue = await session.db.issue.create({
      data: {
        tenantId: session.user.tenantId,
        buildingId,
        flatId,
        reporterId: session.user.id,
        title,
        description,
        priority,
        status: "open",
      },
    });
    return NextResponse.json(issue);
  } catch (error) {
    console.error("POST /api/issues failed:", error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
