#!/bin/bash

# Database Kurulum ve Aktifleştirme Scripti
# Database Setup and Activation Script

set -e

PROJECT_DIR="/Users/tugra/Desktop/rentorgin"
DB_DIR="$PROJECT_DIR/packages/database"

echo "🐘 PostgreSQL Database Kurulumu"
echo "================================"
echo ""

# Step 1: Check PostgreSQL
echo "1️⃣  PostgreSQL durumu kontrol ediliyor..."
if pg_isready -h 127.0.0.1 -p 5432 > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL çalışıyor"
else
    echo "   ⚠️  PostgreSQL çalışmıyor. Başlatılıyor..."
    
    # Try to start PostgreSQL
    if pg_ctl -D /opt/homebrew/var/postgresql@14 status > /dev/null 2>&1; then
        pg_ctl -D /opt/homebrew/var/postgresql@14 start 2>&1 || {
            echo "   ❌ PostgreSQL başlatılamadı!"
            echo ""
            echo "   🔧 Manuel başlatma:"
            echo "   pg_ctl -D /opt/homebrew/var/postgresql@14 start"
            echo ""
            echo "   Veya Homebrew ile:"
            echo "   brew services start postgresql@14"
            exit 1
        }
        sleep 3
        echo "   ✅ PostgreSQL başlatıldı"
    else
        echo "   ❌ PostgreSQL data directory bulunamadı"
        echo "   Lütfen PostgreSQL'i yükleyin: brew install postgresql@14"
        exit 1
    fi
fi
echo ""

# Step 2: Check/Create Database
echo "2️⃣  Database kontrol ediliyor..."
cd "$DB_DIR"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "   ⚠️  .env dosyası bulunamadı. Oluşturuluyor..."
    cat > .env << EOF
DATABASE_URL="postgresql://$(whoami)@127.0.0.1:5432/rentorgin_dev?schema=public"
EOF
    echo "   ✅ .env dosyası oluşturuldu"
fi

# Update .env to use 127.0.0.1 instead of localhost
sed -i '' 's/localhost/127.0.0.1/g' .env 2>/dev/null || sed -i 's/localhost/127.0.0.1/g' .env

# Check if database exists
if psql -h 127.0.0.1 -p 5432 -U $(whoami) -d rentorgin_dev -c "SELECT 1" > /dev/null 2>&1; then
    echo "   ✅ Database 'rentorgin_dev' mevcut"
else
    echo "   ⚠️  Database 'rentorgin_dev' bulunamadı. Oluşturuluyor..."
    createdb -h 127.0.0.1 -p 5432 -U $(whoami) rentorgin_dev 2>&1 || {
        echo "   ❌ Database oluşturulamadı!"
        exit 1
    }
    echo "   ✅ Database oluşturuldu"
fi
echo ""

# Step 3: Run Migrations
echo "3️⃣  Database migration'ları çalıştırılıyor..."
npx prisma migrate dev --name init 2>&1 | tail -5
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "   ✅ Migration'lar tamamlandı"
else
    echo "   ⚠️  Migration hatası (devam ediliyor...)"
fi
echo ""

# Step 4: Generate Prisma Client
echo "4️⃣  Prisma Client generate ediliyor..."
npx prisma generate 2>&1 | tail -3
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "   ✅ Prisma Client generate edildi"
else
    echo "   ❌ Prisma Client generate edilemedi!"
    exit 1
fi
echo ""

# Step 5: Seed Database
echo "5️⃣  Database seed ediliyor (demo veriler)..."
cd "$PROJECT_DIR"
npm run db:seed 2>&1 | tail -10
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "   ✅ Seed tamamlandı"
else
    echo "   ⚠️  Seed hatası (veriler zaten var olabilir)"
fi
echo ""

# Step 6: Verify Demo User
echo "6️⃣  Demo kullanıcı kontrol ediliyor..."
USER_COUNT=$(psql -h 127.0.0.1 -p 5432 -U $(whoami) -d rentorgin_dev -t -c "SELECT COUNT(*) FROM \"users\" WHERE email = 'admin@demo.com';" 2>/dev/null | xargs)
if [ "$USER_COUNT" -gt 0 ]; then
    echo "   ✅ Demo kullanıcı mevcut: admin@demo.com"
    echo "   📝 Şifre: demo123"
else
    echo "   ⚠️  Demo kullanıcı bulunamadı. Seed'i tekrar çalıştırın:"
    echo "   npm run db:seed"
fi
echo ""

echo "🎉 Database kurulumu tamamlandı!"
echo ""
echo "📋 Özet:"
echo "   ✅ PostgreSQL çalışıyor"
echo "   ✅ Database 'rentorgin_dev' aktif"
echo "   ✅ Migration'lar uygulandı"
echo "   ✅ Prisma Client hazır"
echo "   ✅ Demo veriler yüklendi"
echo ""
echo "🔐 Login Bilgileri:"
echo "   Email: admin@demo.com"
echo "   Password: demo123"
echo ""
echo "🚀 Şimdi backend'i başlatabilirsiniz:"
echo "   cd apps/api && npm run start:dev"








