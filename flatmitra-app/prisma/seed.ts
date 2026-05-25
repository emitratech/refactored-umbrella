import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding FlatMitra database...\n");

  // 1. Create Tenant (Organization)
  const tenant = await prisma.tenant.upsert({
    where: { slug: "gokuldham-mgmt" },
    update: {},
    create: {
      name: "Gokuldham Society Management",
      slug: "gokuldham-mgmt",
      plan: "pro",
    },
  });
  console.log("✅ Tenant:", tenant.name, `(${tenant.id})`);

  // 2. Create Admin User (Owner)
  const admin = await prisma.user.upsert({
    where: { authId: "mock-admin-auth-id" },
    update: {},
    create: {
      authId: "mock-admin-auth-id",
      email: "admin@flatmitra.com",
      name: "John Admin",
      role: "ADMIN",
      tenantId: tenant.id,
    },
  });
  console.log("✅ Admin:", admin.name, admin.email);

  // 3. Create Renter User (Tenant/Resident)
  const renter = await prisma.user.upsert({
    where: { authId: "mock-renter-auth-id" },
    update: {},
    create: {
      authId: "mock-renter-auth-id",
      email: "arjun@flatmitra.com",
      name: "Arjun Mehta",
      role: "RENTER",
      tenantId: tenant.id,
    },
  });
  console.log("✅ Renter:", renter.name, renter.email);

  // 4. Create Buildings
  const buildingA = await prisma.building.upsert({
    where: { id: "bldg-tower-a" },
    update: {},
    create: {
      id: "bldg-tower-a",
      tenantId: tenant.id,
      name: "Gokuldham Tower A",
      location: "Powder Gali, Goregaon East, Mumbai 400063",
    },
  });
  const buildingB = await prisma.building.upsert({
    where: { id: "bldg-tower-b" },
    update: {},
    create: {
      id: "bldg-tower-b",
      tenantId: tenant.id,
      name: "Gokuldham Tower B",
      location: "Film City Road, Goregaon East, Mumbai 400063",
    },
  });
  console.log("✅ Buildings:", buildingA.name, "+", buildingB.name);

  // 5. Create Flats
  const flats = [];
  const flatData = [
    { id: "flat-a101", buildingId: buildingA.id, unitNumber: "A-101", rentAmount: "₹18,500", status: "occupied" },
    { id: "flat-a102", buildingId: buildingA.id, unitNumber: "A-102", rentAmount: "₹22,000", status: "occupied" },
    { id: "flat-a103", buildingId: buildingA.id, unitNumber: "A-103", rentAmount: "₹15,000", status: "vacant" },
    { id: "flat-b201", buildingId: buildingB.id, unitNumber: "B-201", rentAmount: "₹28,000", status: "occupied" },
    { id: "flat-b202", buildingId: buildingB.id, unitNumber: "B-202", rentAmount: "₹25,500", status: "overdue" },
  ];
  for (const f of flatData) {
    const flat = await prisma.flat.upsert({
      where: { id: f.id },
      update: {},
      create: { ...f, tenantId: tenant.id },
    });
    flats.push(flat);
  }
  console.log("✅ Flats:", flats.length, "units created");

  // 6. Create Leases
  const lease1 = await prisma.lease.upsert({
    where: { id: "lease-arjun-a101" },
    update: {},
    create: {
      id: "lease-arjun-a101",
      tenantId: tenant.id,
      flatId: "flat-a101",
      renterId: renter.id,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2026-12-31"),
      rentAmount: 18500,
      status: "active",
    },
  });
  console.log("✅ Lease:", lease1.id);

  // 7. Create Bills
  const bill1 = await prisma.bill.upsert({
    where: { id: "bill-may-2025" },
    update: {},
    create: {
      id: "bill-may-2025",
      tenantId: tenant.id,
      leaseId: lease1.id,
      renterId: renter.id,
      amount: 18500,
      dueDate: new Date("2025-05-01"),
      status: "paid",
      paidAt: new Date("2025-05-03"),
      transactionId: "TXN-20250503-001",
    },
  });
  const bill2 = await prisma.bill.upsert({
    where: { id: "bill-jun-2025" },
    update: {},
    create: {
      id: "bill-jun-2025",
      tenantId: tenant.id,
      leaseId: lease1.id,
      renterId: renter.id,
      amount: 18500,
      dueDate: new Date("2025-06-01"),
      status: "pending",
    },
  });
  console.log("✅ Bills:", bill1.id, "+", bill2.id);

  // 8. Create Issues
  const issue1 = await prisma.issue.upsert({
    where: { id: "issue-leak-a101" },
    update: {},
    create: {
      id: "issue-leak-a101",
      tenantId: tenant.id,
      buildingId: buildingA.id,
      flatId: "flat-a101",
      reporterId: renter.id,
      title: "Water leakage in bathroom ceiling",
      description: "There is a continuous drip from the bathroom ceiling, especially during rain. The plaster is also peeling off.",
      priority: "high",
      status: "open",
    },
  });
  const issue2 = await prisma.issue.upsert({
    where: { id: "issue-lift-a" },
    update: {},
    create: {
      id: "issue-lift-a",
      tenantId: tenant.id,
      buildingId: buildingA.id,
      flatId: "flat-a102",
      reporterId: renter.id,
      title: "Lift not working on weekends",
      description: "The elevator in Tower A frequently stops working on weekends. Multiple tenants have complained.",
      priority: "medium",
      status: "in_progress",
      assigneeName: "Rajesh Maintenance Co.",
    },
  });
  const issue3 = await prisma.issue.upsert({
    where: { id: "issue-parking-b" },
    update: {},
    create: {
      id: "issue-parking-b",
      tenantId: tenant.id,
      buildingId: buildingB.id,
      flatId: "flat-b201",
      reporterId: renter.id,
      title: "Unauthorized parking in slot B-12",
      description: "Someone has been parking a scooter in my reserved parking slot B-12 regularly.",
      priority: "low",
      status: "open",
    },
  });
  console.log("✅ Issues:", 3, "created");

  // 9. Create Expenses
  await prisma.expense.upsert({
    where: { id: "exp-plumbing-may" },
    update: {},
    create: {
      id: "exp-plumbing-may",
      tenantId: tenant.id,
      buildingId: buildingA.id,
      category: "maintenance",
      amount: 4500,
      date: new Date("2025-05-10"),
      description: "Emergency plumbing repair — Tower A ground floor",
    },
  });
  await prisma.expense.upsert({
    where: { id: "exp-security-may" },
    update: {},
    create: {
      id: "exp-security-may",
      tenantId: tenant.id,
      buildingId: buildingA.id,
      category: "salary",
      amount: 15000,
      date: new Date("2025-05-01"),
      description: "Security guard salary — May 2025",
    },
  });
  await prisma.expense.upsert({
    where: { id: "exp-electricity-may" },
    update: {},
    create: {
      id: "exp-electricity-may",
      tenantId: tenant.id,
      buildingId: buildingB.id,
      category: "utilities",
      amount: 8200,
      date: new Date("2025-05-15"),
      description: "Common area electricity — Tower B — May 2025",
    },
  });
  console.log("✅ Expenses: 3 created");

  console.log("\n🎉 Seed complete! You can now login with:");
  console.log("   Owner:  admin@flatmitra.com  (mock ADMIN)");
  console.log("   Tenant: arjun@flatmitra.com  (mock RENTER)");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seed error:", e);
    prisma.$disconnect();
    process.exit(1);
  });
