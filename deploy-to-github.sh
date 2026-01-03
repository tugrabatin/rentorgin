#!/bin/bash

# GitHub'a Otomatik Deploy Script'i
# Bu script repository oluşturur, remote ayarlar ve push yapar

set -e

echo "🚀 GitHub Deployment Başlatılıyor..."
echo "===================================="
echo ""

# GitHub CLI authentication kontrolü
if ! gh auth status &>/dev/null; then
    echo "⚠️  GitHub CLI authentication gerekli"
    echo ""
    echo "Lütfen aşağıdaki komutu çalıştırın:"
    echo "   gh auth login"
    echo ""
    echo "Veya GitHub token ile:"
    echo "   gh auth login --with-token < token.txt"
    echo ""
    exit 1
fi

# Kullanıcı bilgilerini al
GITHUB_USER=$(gh api user -q .login)
echo "✅ GitHub kullanıcısı: $GITHUB_USER"
echo ""

# Repository adı
REPO_NAME="rentorgin"
echo "📦 Repository adı: $REPO_NAME"
echo ""

# Repository var mı kontrol et
if gh repo view "$GITHUB_USER/$REPO_NAME" &>/dev/null; then
    echo "ℹ️  Repository zaten mevcut: $GITHUB_USER/$REPO_NAME"
    REPO_EXISTS=true
else
    echo "📝 Yeni repository oluşturuluyor..."
    gh repo create "$REPO_NAME" \
        --public \
        --description "Enterprise Rental Management Platform - Kurumsal Kiralama Yönetim Platformu" \
        --source=. \
        --remote=origin \
        --push
    REPO_EXISTS=false
fi

# Remote URL'yi ayarla
if [ "$REPO_EXISTS" = true ]; then
    echo ""
    echo "🔗 Remote URL ayarlanıyor..."
    git remote remove origin 2>/dev/null || true
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
    echo "✅ Remote URL: https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# Son commit kontrolü
echo ""
echo "📋 Son commit kontrolü..."
git log --oneline -1

# Push yap
echo ""
echo "🚀 GitHub'a push ediliyor..."
git push -u origin main

echo ""
echo "✅ Deployment tamamlandı!"
echo ""
echo "🌐 Repository URL: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "📊 Actions: https://github.com/$GITHUB_USER/$REPO_NAME/actions"
echo ""

