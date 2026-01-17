# RentOrgin - Enterprise Rental Management Platform

BASIS - Kurumsal Kiralama Yönetim Platformu

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- PostgreSQL (for local development)

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Edit .env files with your configuration
# See .env.example files for required variables
```

### Development

```bash
# Start all services (frontend + backend)
npm run dev

# Or start individually:
npm run web:dev    # Frontend (Next.js) - http://localhost:3000
npm run api:dev    # Backend (NestJS) - http://localhost:3001
```

### Build

```bash
# Build all packages
npm run build

# Build individual packages
cd apps/web && npm run build
cd apps/api && npm run build
```

## 📦 Project Structure

```
rentorgin/
├── apps/
│   ├── web/          # Next.js 14 Frontend
│   └── api/          # NestJS Backend API
├── packages/
│   ├── core-domain/  # Domain entities and DTOs
│   └── database/     # Prisma database package
└── turbo.json        # Turborepo configuration
```

## 🚀 Deployment

**Detaylı deploy talimatları için [DEPLOY.md](./DEPLOY.md) dosyasına bakın.**

### Quick Deploy Summary

1. **Frontend (Vercel)**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Backend (Railway)**
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway add postgresql
   railway up
   ```

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md)
- [Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOY.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, Prisma
- **Database**: PostgreSQL
- **Build Tool**: Turborepo (Monorepo)
- **Testing**: Jest, Playwright

## 📝 License

PROPRIETARY
