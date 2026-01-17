#!/bin/bash

# Development Servisleri Başlatma Scripti
# Start Development Services Script

set -e

PROJECT_DIR="/Users/tugra/Desktop/rentorgin"
API_DIR="$PROJECT_DIR/apps/api"
WEB_DIR="$PROJECT_DIR/apps/web"

echo "🚀 RentOrgin Development Servisleri Başlatılıyor..."
echo ""

# Kill existing processes
echo "🧹 Mevcut process'ler temizleniyor..."
lsof -ti:3000,3001,3002 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 2

# Check PostgreSQL
echo "🐘 PostgreSQL kontrol ediliyor..."
if ! pg_isready -h 127.0.0.1 -p 5432 > /dev/null 2>&1; then
    echo "⚠️  PostgreSQL çalışmıyor. Başlatılıyor..."
    pg_ctl -D /opt/homebrew/var/postgresql@14 start 2>/dev/null || {
        echo "❌ PostgreSQL başlatılamadı. Manuel olarak başlatın:"
        echo "   pg_ctl -D /opt/homebrew/var/postgresql@14 start"
        exit 1
    }
    sleep 3
fi
echo "✅ PostgreSQL çalışıyor"
echo ""

# Start Backend
echo "🔧 Backend API başlatılıyor (Port 3002)..."
cd "$API_DIR"
if [ ! -f ".env" ]; then
    echo "⚠️  .env dosyası bulunamadı. Oluşturuluyor..."
    cat > .env << EOF
DATABASE_URL="postgresql://$(whoami)@127.0.0.1:5432/rentorgin_dev?schema=public"
API_PORT=3002
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRATION=7d
NODE_ENV=development
EOF
fi

# Start backend in background
npm run start:dev > /tmp/rentorgin-api.log 2>&1 &
API_PID=$!
echo "   Backend PID: $API_PID"
echo "   Log: /tmp/rentorgin-api.log"

# Wait for backend to start
echo "   Backend başlatılıyor..."
sleep 5

# Check if backend is running
for i in {1..10}; do
    if curl -s http://localhost:3002/api/v1/health > /dev/null 2>&1; then
        echo "✅ Backend API çalışıyor: http://localhost:3002/api/v1"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "❌ Backend başlatılamadı. Log'u kontrol edin:"
        echo "   tail -f /tmp/rentorgin-api.log"
        exit 1
    fi
    sleep 2
done
echo ""

# Start Frontend
echo "🎨 Frontend başlatılıyor (Port 3000)..."
cd "$WEB_DIR"

# Start frontend in background
npm run dev > /tmp/rentorgin-web.log 2>&1 &
WEB_PID=$!
echo "   Frontend PID: $WEB_PID"
echo "   Log: /tmp/rentorgin-web.log"

# Wait for frontend to start
echo "   Frontend başlatılıyor..."
sleep 8

# Check if frontend is running
for i in {1..15}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend çalışıyor: http://localhost:3000"
        break
    fi
    if [ $i -eq 15 ]; then
        echo "⚠️  Frontend henüz hazır değil. Biraz bekleyin ve şu adresi kontrol edin:"
        echo "   http://localhost:3000"
        echo "   Log: tail -f /tmp/rentorgin-web.log"
    fi
    sleep 2
done
echo ""

echo "🎉 Servisler başlatıldı!"
echo ""
echo "📋 Bilgiler:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3002/api/v1"
echo "   API Docs: http://localhost:3002/api/docs"
echo ""
echo "📝 Log'lar:"
echo "   Backend: tail -f /tmp/rentorgin-api.log"
echo "   Frontend: tail -f /tmp/rentorgin-web.log"
echo ""
echo "🛑 Durdurmak için:"
echo "   kill $API_PID $WEB_PID"
echo "   veya"
echo "   lsof -ti:3000,3002 | xargs kill -9"









