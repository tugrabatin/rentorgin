#!/bin/bash

# 🗄️ RentOrgin Database Setup Script
# Veritabanı kurulum scripti

set -e  # Hata durumunda dur

echo "🚀 RentOrgin Database Setup Başlıyor..."
echo ""

# 1. .env dosyasını database paketine kopyala
echo "📋 1/6: .env dosyası hazırlanıyor..."
if [ -f .env ]; then
  cp .env packages/database/.env
  echo "✅ .env kopyalandı"
else
  echo "⚠️  .env dosyası bulunamadı, oluşturuluyor..."
  cat > .env << 'EOF'
DATABASE_URL="postgresql://tugra@localhost:5432/rentorgin_dev?schema=public"
API_PORT=3002
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRATION=7d
NODE_ENV=development
APP_VERSION=0.3.1
EOF
  cp .env packages/database/.env
  echo "✅ .env oluşturuldu ve kopyalandı"
fi

# 2. Database oluştur
echo ""
echo "🗄️  2/6: Database oluşturuluyor..."
if createdb rentorgin_dev 2>/dev/null; then
  echo "✅ Database oluşturuldu: rentorgin_dev"
else
  echo "ℹ️  Database zaten var, devam ediliyor..."
fi

# 3. Prisma generate
echo ""
echo "⚙️  3/6: Prisma Client generate ediliyor..."
cd packages/database
npx prisma generate
echo "✅ Prisma Client hazır"

# 4. Migration
echo ""
echo "🔄 4/6: Database migration çalıştırılıyor..."
npx prisma migrate dev --name init
echo "✅ Migration tamamlandı"

# 5. Seed
echo ""
echo "🌱 5/6: Demo data ekleniyor..."
cd ../..
npm run db:seed
echo "✅ Demo data eklendi"

# 6. Kontrol
echo ""
echo "✅ 6/6: Veritabanı hazır!"
echo ""
echo "📊 Demo Kullanıcılar:"
echo "   Email: admin@demo.com"
echo "   Password: demo123"
echo ""
echo "🎯 Sonraki Adımlar:"
echo "   1. Backend başlat: cd apps/api && npm run start:dev"
echo "   2. Frontend başlat: cd apps/web && npm run dev"
echo "   3. Database Studio: cd packages/database && npx prisma studio"
echo ""
echo "✨ Başarılı! Veritabanı kullanıma hazır!"















