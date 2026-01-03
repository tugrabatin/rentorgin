#!/bin/bash

# Vercel Deployment Script
# Vercel'e deploy etmek için script

set -e

echo "🚀 Vercel Deployment Başlatılıyor..."
echo "===================================="
echo ""

# Vercel CLI kontrolü
if ! command -v npx vercel &> /dev/null; then
    echo "⚠️  Vercel CLI bulunamadı, yükleniyor..."
    npm install --save-dev vercel
fi

# Environment variables kontrolü
echo "📋 Environment Variables Kontrolü:"
if [ -z "$NEXT_PUBLIC_API_URL" ]; then
    echo "⚠️  UYARI: NEXT_PUBLIC_API_URL ayarlanmamış!"
    echo "   Vercel dashboard'unda environment variable olarak ekleyin"
    echo ""
fi

# Build test
echo "🔨 Build test ediliyor..."
cd apps/web
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build başarısız! Lütfen hataları düzeltin."
    exit 1
fi

echo ""
echo "✅ Build başarılı!"
echo ""

# Vercel'e deploy
echo "🚀 Vercel'e deploy ediliyor..."
cd ../..
npx vercel --prod

echo ""
echo "✅ Deployment tamamlandı!"
echo ""
echo "📝 Not: Eğer ilk kez deploy ediyorsanız:"
echo "   1. Vercel dashboard'unda root directory'yi 'apps/web' olarak ayarlayın"
echo "   2. Environment variables ekleyin:"
echo "      - NEXT_PUBLIC_API_URL"
echo "      - NEXT_PUBLIC_APP_VERSION"
echo ""

