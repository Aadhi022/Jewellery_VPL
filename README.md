# Jewellery Showroom — Full-Stack Website

A production-quality, CMS-driven website for a premium South Indian jewellery showroom and jewellery pawn/loan business.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Images | Cloudinary |
| Auth | JWT (passport-jwt) + bcrypt |

## Project Structure

```
jewellery-showroom/
├── frontend/          # Next.js 14 App Router
├── backend/           # NestJS REST API
├── shared/            # Shared TypeScript types
├── .env.example       # Environment variables template
└── package.json       # Monorepo root
```

## Quick Start

### Prerequisites

- Node.js >= 20
- PostgreSQL (local or hosted)
- Cloudinary account (for image uploads)

### 1. Clone and Install

```bash
git clone <repo-url>
cd jewellery-showroom
```

### 2. Environment Setup

```bash
# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Edit each `.env` file with your real values.

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed demo data
npm run db:seed
```

### 4. Run Development Servers

```bash
# Terminal 1: Backend API (http://localhost:3001)
npm run dev:backend

# Terminal 2: Frontend (http://localhost:3000)
npm run dev:frontend
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWT tokens (min 64 chars) |
| `JWT_EXPIRY` | Token expiry (default: `7d`) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `PORT` | Backend port (default: `3001`) |
| `FRONTEND_URL` | Frontend URL for CORS (default: `http://localhost:3000`) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL (default: `http://localhost:3001`) |
| `NEXT_PUBLIC_SITE_URL` | Frontend public URL (for SEO) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (international format, no +) |

## Admin Access

After seeding, log in at `/admin/login`:

| Field | Value |
|-------|-------|
| Email | `admin@jewellery.demo` |
| Password | `Admin@123` |

> ⚠️ **Change the admin password immediately in production.**

## Key Features

### Customer Website
- Premium editorial homepage with hero, rates, categories, collections
- Gold, Silver, and Diamond catalogues with filters
- Product detail pages with image gallery
- Collections pages
- WhatsApp enquiry integration
- Appointment booking
- Contact / showroom page
- Gold loan / pawn information page
- About page

### Admin CMS
- **Products**: Create, edit, archive, feature products
- **Images**: Cloudinary upload, drag-to-reorder, set primary
- **Categories**: Manage category hierarchy
- **Collections**: Curated collections with product selection
- **Rates**: Update daily metal rates (22K, 24K, 18K Gold, Silver) with history
- **Enquiries**: View and manage customer enquiries and appointments
- **Settings**: Configure all business info, announcement bar, hero content, certifications

### CMS-Driven
All content changes made in admin are immediately reflected on the customer website:
- Rate updates → homepage rates section
- New product → appears in catalogue
- Announcement bar changes → visible immediately
- Business info changes → contact page, footer, navbar

## API Reference

### Public Endpoints

```
GET  /api/products              # Paginated product list
GET  /api/products/:code        # Product by code
GET  /api/categories            # All categories
GET  /api/categories/:slug      # Category with products
GET  /api/collections           # Published collections
GET  /api/collections/:slug     # Collection with products
GET  /api/rates                 # Current metal rates
GET  /api/showroom              # Showroom settings
POST /api/enquiries             # Submit enquiry
```

### Admin Endpoints (requires JWT)

All admin endpoints require `Authorization: Bearer {token}` header.

```
POST /api/auth/login
GET  /api/auth/me
GET  /api/admin/dashboard
GET/POST/PUT/DELETE /api/admin/products
GET/POST/PUT/DELETE /api/admin/categories
GET/POST/PUT/DELETE /api/admin/collections
PUT  /api/admin/rates
GET  /api/admin/rates/history
GET/PUT /api/admin/enquiries/:id
GET/PUT /api/admin/settings/showroom
GET/PUT /api/admin/settings/business
POST /api/admin/uploads
```

## Rate Provider Architecture

The rate system uses a provider abstraction for future extensibility:

```
RateProvider (interface)
    ↓
ManualRateProvider (current — admin manually updates)
    ↓ (future)
ExternalGoldRateProvider (IBJA or other market data API)
```

This means switching to live market rates requires only implementing a new provider, not changing any frontend code.

## Image System

Images are stored in Cloudinary with:
- Automatic optimization (quality: auto, format: auto)
- Responsive sizing
- Per-product ordering (drag-to-reorder in admin)
- Primary image designation

## Security

- JWT authentication with configurable expiry
- bcrypt password hashing
- Helmet security headers
- CORS restricted to configured frontend URL
- Rate limiting (configurable TTL and limit)
- Input validation via class-validator
- Soft delete (products/categories never permanently deleted)
- Admin routes protected by JWT guard

## Production Deployment

1. Set all environment variables in your hosting platform
2. Run `npm run db:migrate` in production
3. Build frontend: `npm run build:frontend`
4. Build backend: `npm run build:backend`
5. Start backend: `node dist/main`
6. Start frontend: `next start`

## Important Notes

- **Demo data**: The seed data is clearly marked as `[DEMO]` and is not real inventory
- **Business info**: All contact details, certifications, loan terms must be entered by the actual business owner via Admin → Settings
- **Prices**: Never hardcode prices. All values come from the database
- **WhatsApp number**: Set in admin settings or `NEXT_PUBLIC_WHATSAPP_NUMBER` env var

---

Built with ❤️ for South Indian jewellery heritage.
