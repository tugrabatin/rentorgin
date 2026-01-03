#!/bin/bash

# GitHub Remote URL Ayarlama Script'i
# Kullanım: ./setup-github-remote.sh

echo "🚀 GitHub Remote URL Ayarlama"
echo "================================"
echo ""

# Mevcut remote'u göster
echo "📋 Mevcut remote URL:"
git remote -v
echo ""

# Kullanıcıdan bilgi al
read -p "GitHub kullanıcı adınızı girin: " GITHUB_USERNAME
read -p "Repository adını girin (varsayılan: rentorgin): " REPO_NAME
REPO_NAME=${REPO_NAME:-rentorgin}

echo ""
echo "🔗 Seçenekler:"
echo "1) HTTPS (önerilir - kolay)"
echo "2) SSH (SSH key'iniz varsa)"
read -p "Seçiminiz (1 veya 2): " CHOICE

if [ "$CHOICE" = "2" ]; then
    REMOTE_URL="git@github.com:${GITHUB_USERNAME}/${REPO_NAME}.git"
else
    REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
fi

echo ""
echo "⚠️  Ayarlanacak URL: $REMOTE_URL"
read -p "Devam etmek istiyor musunuz? (y/n): " CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    # Mevcut remote'u kaldır
    git remote remove origin 2>/dev/null
    
    # Yeni remote ekle
    git remote add origin "$REMOTE_URL"
    
    echo ""
    echo "✅ Remote URL başarıyla ayarlandı!"
    echo ""
    echo "📋 Yeni remote URL:"
    git remote -v
    echo ""
    echo "🚀 Şimdi push yapabilirsiniz:"
    echo "   git push -u origin main"
else
    echo "❌ İşlem iptal edildi."
fi

