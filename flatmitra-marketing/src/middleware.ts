import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Marketing-only deploy — no auth middleware needed.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|webmanifest)).*)"],
};
