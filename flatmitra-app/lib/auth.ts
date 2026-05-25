import { createClient } from "@/lib/supabase/server";
import { prisma, getTenantDb } from "@/lib/db";
import { cookies } from "next/headers";

export interface AuthenticatedSession {
  user: {
    id: string;
    authId: string;
    email: string;
    name: string;
    role: string;
    tenantId: string;
    createdAt: Date;
  };
  db: ReturnType<typeof getTenantDb>;
}

/**
 * Resolves the current authenticated user and returns their database profile
 * along with a tenant-isolated database client instance.
 * Returns null if the user is unauthenticated or has no registered profile.
 */
export async function getAuthSession(): Promise<AuthenticatedSession | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const cookieStore = await cookies();
    const mockRole = cookieStore.get("flatmitra-mock-role")?.value;

    let targetAuthId = user?.id;

    // Use developer mock auth if requested and Supabase is unauthenticated
    if (!targetAuthId && (mockRole === "ADMIN" || mockRole === "RENTER")) {
      targetAuthId = mockRole === "ADMIN" ? "mock-admin-auth-id" : "mock-renter-auth-id";
    }

    if (!targetAuthId) {
      return null;
    }

    const dbUser = await prisma.user.findUnique({
      where: { authId: targetAuthId },
    });

    if (!dbUser) {
      return null;
    }

    return {
      user: dbUser,
      db: getTenantDb(dbUser.tenantId),
    };
  } catch (err) {
    console.error("Error resolving authentication session:", err);
    return null;
  }
}
