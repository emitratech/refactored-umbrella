import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

/**
 * Returns a tenant-isolated database client wrapper.
 * Dynamically extends Prisma queries to enforce the tenant boundary,
 * ensuring no tenant data is leaked in the application layer.
 */
export function getTenantDb(tenantId: string) {
  if (!tenantId) {
    throw new Error("Tenant ID is required to access the tenant database client.");
  }
  
  return prisma.$extends({
    query: {
      building: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      },
      flat: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      },
      lease: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      },
      bill: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      },
      issue: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      },
      expense: {
        async $allOperations({ model, operation, args, query }) {
          const anyArgs = args as any;
          anyArgs.where = { ...anyArgs.where, tenantId };
          return query(anyArgs);
        }
      }
    }
  });
}
