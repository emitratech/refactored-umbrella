# FlatMitra — Property Management SaaS

> Multi-tenant property management platform for Indian landlords. Track buildings, flats, rent collection, expenses, issues, and tenant communications — all from one dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **Backend** | Next.js API Routes, Prisma 7 ORM |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth + mock dev auth |
| **Email** | Resend |
| **Deployment** | Vercel (planned) |

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Supabase project (free tier works)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/emitratech/refactored-umbrella.git
cd refactored-umbrella

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Copy env and fill in your Supabase credentials
cp .env.example .env

# 4. Push database schema
npx prisma db push

# 5. Seed test data
npx tsx prisma/seed.ts

# 6. Generate Prisma client
npx prisma generate

# 7. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Dev Login

| Role | Email | How |
|------|-------|-----|
| **Owner** | admin@flatmitra.com | Click "Enter as Owner" on login page |
| **Tenant** | arjun@flatmitra.com | Click "Enter as Tenant" on login page |

## Project Structure

```
app/
├── (marketing)/     # Landing page, features, pricing
├── (owner)/         # Owner dashboard (sidebar layout)
│   ├── dashboard/   # KPI overview
│   ├── buildings/   # Building management
│   ├── tenants/     # Tenant management
│   ├── billing/     # Rent collection
│   ├── issues/      # Maintenance issues
│   ├── expenses/    # Expense tracking
│   ├── reports/     # Analytics
│   ├── settings/    # Account settings
│   └── support/     # Help & support
├── (tenant)/        # Tenant mobile-first view
│   ├── home/        # Tenant home
│   ├── bills/       # Rent bills
│   ├── tenant-issues/ # Report issues
│   ├── documents/   # Lease documents
│   └── more/        # Profile & settings
├── login/           # Authentication page
└── api/             # REST API routes
    ├── dashboard/   # Dashboard aggregation
    ├── buildings/   # CRUD
    ├── expenses/    # CRUD
    ├── issues/      # CRUD
    ├── bills/       # CRUD
    ├── tenants/     # CRUD
    └── me/          # Current user
```

## Architecture

- **Multi-tenant isolation**: Every query is scoped via `getTenantDb(tenantId)` using Prisma client extensions
- **Prisma 7**: Uses `@prisma/adapter-pg` driver adapter (no `url` in schema.prisma)
- **Database**: Supabase PostgreSQL with connection pooling (port 6543) for runtime and direct connection (port 5432) for migrations

## Environment Variables

See [`.env.example`](.env.example) for the full list.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npx prisma db push` | Push schema to database |
| `npx prisma generate` | Regenerate Prisma client |
| `npx tsx prisma/seed.ts` | Seed test data |
| `npm run build` | Production build |

## Team

Built by **Emitra Tech** — [@emitratech](https://github.com/emitratech)

## License

Proprietary. All rights reserved.
