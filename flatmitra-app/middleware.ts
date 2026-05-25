import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // 1. Exclude public assets, static files, login page, onboarding, and marketing pages from auth wall
  const isPublicRoute =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/features" ||
    pathname === "/pricing" ||
    pathname === "/waitlist" ||
    pathname.startsWith("/legal") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/onboarding") ||
    pathname.startsWith("/api/waitlist");

  if (isPublicRoute) {
    return response;
  }

  let userRole = user?.user_metadata?.role;
  let isAuthenticated = !!user;

  // Check developer mock login bypass cookie
  const mockRoleCookie = request.cookies.get("flatmitra-mock-role")?.value;
  if (mockRoleCookie === "ADMIN" || mockRoleCookie === "RENTER") {
    isAuthenticated = true;
    userRole = mockRoleCookie;
  }

  // 2. If not authenticated, redirect to /login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Role-based Route Protection
  const role = userRole; // ADMIN | STAFF | RENTER

  // Tenant-facing paths (Renter)
  const isRenterPath =
    pathname.startsWith("/home") ||
    pathname.startsWith("/bills") ||
    pathname.startsWith("/documents") ||
    pathname.startsWith("/tenant-issues") ||
    pathname.startsWith("/more");

  // Owner-facing paths (Admin/Staff)
  const isOwnerPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/buildings") ||
    pathname.startsWith("/tenants") ||
    pathname.startsWith("/billing") ||
    pathname.startsWith("/issues") ||
    pathname.startsWith("/expenses") ||
    pathname.startsWith("/reports");

  if (role === "RENTER" && isOwnerPath) {
    // Renters cannot access Owner dashboards -> redirect to tenant home
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (role === "ADMIN" && isRenterPath) {
    // Owners/Admins cannot access Renter views -> redirect to owner dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - SVG, PNG, JPG, JPEG, GIF, WEBP assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
