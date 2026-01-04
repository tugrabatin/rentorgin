#!/bin/bash

# Port Kontrol Scripti
# Port Check Script

echo "🔍 Çalışan servisler kontrol ediliyor..."
echo ""

# Check all common ports
ports=(3000 3001 3002 3003 4000 5000 8000 8080)

for port in "${ports[@]}"; do
    if lsof -ti:$port > /dev/null 2>&1; then
        process=$(lsof -ti:$port | xargs ps -p -o command= 2>/dev/null | head -1)
        echo "✅ Port $port: Kullanımda"
        echo "   Process: $process"
        echo ""
    fi
done

echo "📡 Network bağlantıları kontrol ediliyor..."
echo ""

# Check if services are listening
echo "Next.js (Frontend) kontrolü:"
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ http://localhost:3000 - ÇALIŞIYOR"
else
    echo "❌ http://localhost:3000 - ERİŞİLEMİYOR"
fi

echo ""
echo "Backend API kontrolü:"
if curl -s http://localhost:3001/api/v1/health > /dev/null 2>&1; then
    echo "✅ http://localhost:3001/api/v1/health - ÇALIŞIYOR"
    curl -s http://localhost:3001/api/v1/health | head -3
else
    echo "❌ http://localhost:3001/api/v1/health - ERİŞİLEMİYOR"
fi

echo ""
echo "🔧 Öneriler:"
echo "1. Backend'i başlatın: cd apps/api && npm run start:dev"
echo "2. Frontend'i başlatın: cd apps/web && npm run dev"
echo "3. Terminal loglarını kontrol edin"








