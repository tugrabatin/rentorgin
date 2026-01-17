#!/bin/bash

# Backend Health Check Script
# Backend sağlık kontrolü scripti

echo "🔍 Backend API kontrolü yapılıyor..."
echo ""

# Check if backend is running
API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3001/api/v1}"
HEALTH_URL="${API_URL%/api/v1}/api/v1/health"

echo "📡 API URL: $API_URL"
echo "🏥 Health Check URL: $HEALTH_URL"
echo ""

# Try to connect
response=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_URL" 2>/dev/null)

if [ "$response" = "200" ]; then
    echo "✅ Backend API çalışıyor!"
    echo ""
    echo "🧪 Login endpoint testi yapılıyor..."
    
    login_response=$(curl -s -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email":"admin@demo.com","password":"demo123"}' 2>/dev/null)
    
    if echo "$login_response" | grep -q "accessToken"; then
        echo "✅ Login endpoint çalışıyor!"
        echo "✅ Demo kullanıcı ile giriş başarılı!"
    else
        echo "❌ Login endpoint hatası:"
        echo "$login_response" | head -5
    fi
else
    echo "❌ Backend API çalışmıyor!"
    echo ""
    echo "🔧 Çözüm:"
    echo "1. Backend'i başlatın:"
    echo "   cd apps/api"
    echo "   npm run start:dev"
    echo ""
    echo "2. Port kontrolü:"
    lsof -ti:3001 > /dev/null 2>&1 && echo "   ✅ Port 3001 kullanımda" || echo "   ❌ Port 3001 boş"
    echo ""
    echo "3. Environment variables kontrolü:"
    if [ -f "apps/api/.env" ]; then
        echo "   ✅ .env dosyası mevcut"
    else
        echo "   ❌ .env dosyası bulunamadı"
    fi
fi









