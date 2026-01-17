#!/bin/bash
# RentOrgin Deploy Script
# Bu script'i çalıştırmak için: bash DEPLOY_COMMANDS.sh

set -e  # Hata durumunda dur

echo "🚀 RentOrgin Deploy Başlatılıyor..."
echo ""

# ============================================
# ADIM 0: Proje hazırlığı
# ============================================
cd /Users/tugra/Desktop/rentorgin

echo "✅ Proje dizinine geçildi"
echo ""

# ============================================
# ADIM 1: Frontend Deploy (Vercel)
# ============================================
echo "📦 ADIM 1: Frontend Deploy (Vercel)"
echo ""

# Vercel'e login (npx kullanarak, global kurulum gerektirmez)
echo "Vercel'e login oluyorsunuz..."
npx vercel login

# Frontend deploy
echo ""
echo "Frontend deploy ediliyor..."
npx vercel

echo ""
echo "⚠️  İlk deploy'ta sorular sorulacak:"
echo "   - Set up and deploy? → Y"
echo "   - Which scope? → (Hesabını seç)"
echo "   - Link to existing project? → N"
echo "   - Project name? → rentorgin-web"
echo "   - Directory? → ./apps/web"
echo "   - Override settings? → Y"
echo "     - Build Command: npm run build --workspace=apps/web"
echo "     - Output Directory: .next"
echo "     - Install Command: npm install"
echo ""

# Production deploy
echo "Production deploy ediliyor..."
npx vercel --prod

echo ""
echo "✅ Frontend deploy tamamlandı!"
echo "📝 Vercel URL'ini not edin (bir sonraki adımda kullanacaksınız)"
echo ""

# ============================================
# ADIM 2: Backend Deploy (Railway)
# ============================================
echo "📦 ADIM 2: Backend Deploy (Railway)"
echo ""

# Railway'e login
echo "Railway'e login oluyorsunuz..."
npx @railway/cli login

# Railway projesi oluştur
echo ""
echo "Railway projesi oluşturuluyor..."
npx @railway/cli init

echo ""
echo "⚠️  Sorular:"
echo "   - Project name? → rentorgin-api"
echo "   - Environment? → production"
echo ""

# PostgreSQL database ekle
echo "PostgreSQL database ekleniyor..."
npx @railway/cli add postgresql

# Database URL'ini göster
echo ""
echo "📝 Database URL:"
npx @railway/cli variables | grep DATABASE_URL || echo "DATABASE_URL otomatik olarak eklenir"

# Backend service'i deploy et
cd apps/api
echo ""
echo "Backend service deploy ediliyor..."
npx @railway/cli link
npx @railway/cli up

echo ""
echo "✅ Backend deploy tamamlandı!"
echo "📝 Railway URL'ini not edin (Settings → Generate Domain)"
echo ""

# ============================================
# ADIM 3: Environment Variables
# ============================================
cd /Users/tugra/Desktop/rentorgin

echo "📦 ADIM 3: Environment Variables Ayarlama"
echo ""
echo "⚠️  MANUEL ADIMLAR:"
echo ""
echo "1. Railway Dashboard → Variables → Şu değişkenleri ekleyin:"
echo "   FRONTEND_URL=https://YOUR_VERCEL_URL.vercel.app"
echo "   JWT_SECRET=$(openssl rand -base64 32)"
echo "   SESSION_SECRET=$(openssl rand -base64 32)"
echo "   NODE_ENV=production"
echo "   APP_ENV=production"
echo "   APP_VERSION=0.4.0"
echo "   APP_NAME=RentOrgin"
echo "   RATE_LIMIT_TTL=60"
echo "   RATE_LIMIT_MAX=100"
echo "   STORAGE_PATH=./storage/uploads"
echo "   MAX_UPLOAD_SIZE=52428800"
echo ""
echo "2. Vercel Dashboard → Settings → Environment Variables → Şunu ekleyin:"
echo "   NEXT_PUBLIC_API_URL=https://YOUR_RAILWAY_URL.up.railway.app/api/v1"
echo ""
echo "3. Vercel'de redeploy:"
echo "   npx vercel --prod"
echo ""

# ============================================
# ADIM 4: Database Migration
# ============================================
echo "📦 ADIM 4: Database Migration"
echo ""
cd apps/api
echo "Migration çalıştırılıyor..."
npx @railway/cli run npx prisma migrate deploy

echo ""
echo "✅ Migration tamamlandı!"
echo ""

# ============================================
# ✅ TAMAMLANDI
# ============================================
echo "🎉 DEPLOY TAMAMLANDI!"
echo ""
echo "📝 Kontrol edin:"
echo "   - Frontend: https://YOUR_VERCEL_URL.vercel.app"
echo "   - Backend Health: https://YOUR_RAILWAY_URL.up.railway.app/api/v1/health"
echo "   - Backend Docs: https://YOUR_RAILWAY_URL.up.railway.app/api/docs"
echo ""
