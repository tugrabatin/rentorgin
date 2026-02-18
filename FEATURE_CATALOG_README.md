# Feature Catalog - Kullanım Kılavuzu
# Feature Catalog - Usage Guide

## 📋 İçerik / Contents

Bu repository şu feature dokümantasyon dosyalarını içerir:

This repository contains the following feature documentation files:

1. **`docs/feature-catalog.md`** - İnsan okunabilir katalog / Human-readable catalog
2. **`docs/feature-registry.json`** - Makine okunabilir registry / Machine-readable registry
3. **`tools/generate_feature_catalog.ts`** - Otomatik generator / Auto-generator

---

## 🎯 Feature Catalog Nedir? / What is the Feature Catalog?

**TR:**  
Feature catalog, RentOrgin platformundaki tüm özelliklerin (mevcut ve planlanan) kapsamlı dokümantasyonudur. Her feature için:

- ✅ Ne işe yaradığı (amaç)
- ✅ Nasıl çalıştığı (akış)
- ✅ Giriş noktaları (API routes, UI pages, CLI)
- ✅ Temel bileşenler (controller, service, UI)
- ✅ Güvenlik & gizlilik notları
- ✅ Test kapsamı
- ✅ **KANIT** (dosya yolları, satır numaraları)

**EN:**  
The feature catalog is a comprehensive documentation of all features (current and planned) in the RentOrgin platform. For each feature:

- ✅ What it does (purpose)
- ✅ How it works (flow)
- ✅ Entry points (API routes, UI pages, CLI)
- ✅ Core components (controller, service, UI)
- ✅ Security & privacy notes
- ✅ Test coverage
- ✅ **EVIDENCE** (file paths, line numbers)

---

## 📖 Kullanım / Usage

### 1. Feature Catalog Okuma / Reading the Catalog

**İnsan için / For humans:**

```bash
cat docs/feature-catalog.md
# veya / or
open docs/feature-catalog.md
```

**Makine için / For machines:**

```bash
cat docs/feature-registry.json
# veya / or
jq . docs/feature-registry.json
```

### 2. Feature Arama / Searching Features

**Belirli bir feature bul / Find a specific feature:**

```bash
# Markdown'da ara / Search in markdown
grep -A 10 "Authentication" docs/feature-catalog.md

# JSON'da ara / Search in JSON
jq '.features[] | select(.id == "auth")' docs/feature-registry.json
```

**Domain'e göre filtrele / Filter by domain:**

```bash
jq '.features[] | select(.domain == "core")' docs/feature-registry.json
```

**Status'e göre filtrele / Filter by status:**

```bash
jq '.features[] | select(.status == "ga")' docs/feature-registry.json
```

### 3. Feature Catalog Güncelleme / Updating the Catalog

**Otomatik güncelleme / Auto-update:**

```bash
npm run generate:catalog
```

Bu komut:
- API controller'ları tarar
- UI pages'leri tarar
- Database schema'yı tarar
- `feature-registry.json` ve `feature-catalog.md` günceller

**Manuel güncelleme / Manual update:**

```bash
# 1. feature-catalog.md dosyasını düzenle / Edit feature-catalog.md
# 2. feature-registry.json dosyasını düzenle / Edit feature-registry.json
# 3. Commit yap / Commit changes
git add docs/feature-catalog.md docs/feature-registry.json
git commit -m "docs: update feature catalog"
```

---

## 🔧 Generator Script Kullanımı / Using the Generator Script

### Gereksinimler / Requirements

```bash
npm install -D tsx glob
```

### Çalıştırma / Running

```bash
# NPM script ile / Via NPM script
npm run generate:catalog

# Doğrudan / Directly
npx tsx tools/generate_feature_catalog.ts
```

### Çıktı / Output

```
🔍 Scanning codebase for features...

✅ Found 13 API modules
✅ Found 28 UI page groups
✅ Found 20+ database models

✅ Generated: docs/feature-registry.json
✅ Generated: docs/feature-catalog.md

✨ Feature catalog generation complete!
```

---

## 📊 Feature İstatistikleri / Feature Statistics

**Mevcut / Current:**

```bash
# Total features
jq '.meta.totalFeatures' docs/feature-registry.json

# By status
jq '.statistics.byStatus' docs/feature-registry.json

# By domain
jq '.statistics.byDomain' docs/feature-registry.json

# Test coverage
jq '.statistics.testCoverage' docs/feature-registry.json
```

**Örnek çıktı / Example output:**

```json
{
  "totalFeatures": 21,
  "byStatus": {
    "ga": 18,
    "beta": 3,
    "experimental": 0
  },
  "testCoverage": {
    "overall": 5,
    "unitTests": 1,
    "e2eTests": 1
  }
}
```

---

## 🚀 CI/CD Entegrasyonu / CI/CD Integration

### GitHub Actions (Önerilen / Recommended)

Aşağıdaki workflow'u ekleyerek feature catalog'un güncel olmasını garantileyin:

Add the following workflow to ensure the feature catalog stays up-to-date:

```yaml
# .github/workflows/feature-catalog-check.yml
name: Feature Catalog Validation

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run generate:catalog
      - name: Check for changes
        run: |
          if [ -n "$(git status --porcelain docs/feature-registry.json)" ]; then
            echo "❌ feature-registry.json is out of date. Run 'npm run generate:catalog'"
            exit 1
          fi
```

### Pre-commit Hook (Opsiyonel / Optional)

```bash
# .husky/pre-commit
#!/bin/sh
npm run generate:catalog
git add docs/feature-registry.json docs/feature-catalog.md
```

---

## 📚 Örnek Kullanım Senaryoları / Example Use Cases

### 1. Yeni Ekip Üyesi Onboarding / New Team Member Onboarding

```bash
# Feature'ları öğren / Learn features
cat docs/feature-catalog.md

# Hangi feature'lar production-ready? / Which features are production-ready?
jq '.features[] | select(.status == "ga") | .name' docs/feature-registry.json
```

### 2. Feature Planlaması / Feature Planning

```bash
# Planlanan feature'ları gör / View planned features
jq '.plannedFeatures[] | {name, targetVersion, priority}' docs/feature-registry.json
```

### 3. Test Kapsamı Analizi / Test Coverage Analysis

```bash
# Test coverage olmayan feature'lar / Features without test coverage
jq '.features[] | select(.tests.coverage == 0) | .name' docs/feature-registry.json
```

### 4. Security Audit / Güvenlik Denetimi

```bash
# Güvenlik feature'ları olan modüller / Modules with security features
jq '.features[] | select(.security != null) | {name, security}' docs/feature-registry.json
```

---

## 🔍 Feature Kanıt Sistemi / Feature Evidence System

Her feature için kanıt gereklidir:

Evidence is required for every feature:

### Kanıt Türleri / Evidence Types:

1. **Controller** - API endpoint tanımları / API endpoint definitions
2. **Service** - Business logic / İş mantığı
3. **UI Pages** - Kullanıcı arayüzü / User interface
4. **Schema** - Database model / Veritabanı modeli
5. **Tests** - Test dosyaları / Test files
6. **Docs** - Dokümantasyon / Documentation

### Örnek / Example:

```json
{
  "id": "auth",
  "name": "Authentication",
  "evidence": {
    "controller": "apps/api/src/modules/auth/auth.controller.ts:1-96",
    "service": "apps/api/src/modules/auth/auth.service.ts",
    "ui_pages": ["apps/web/src/app/login/page.tsx"],
    "schema": "packages/database/prisma/schema.prisma:77-108",
    "docs": ["docs/auth-implementation.md"]
  }
}
```

---

## ⚠️ Önemli Notlar / Important Notes

### Halüsinasyon Engeli / Hallucination Prevention

✅ **YAPILACAK / DO:**
- Yalnızca repoda kanıt olan feature'ları yaz / Only document features with evidence in the repo
- Her feature için dosya yolu + satır numarası ver / Provide file path + line numbers for each feature
- "Unknown" de, tahmin etme / Say "unknown", don't guess

❌ **YAPILMAYACAK / DON'T:**
- Planlanmamış feature'ları uydurma / Invent unplanned features
- Kanıtsız iddialar / Make claims without evidence
- "Gelecekte eklenebilir" diye varsayma / Assume "might be added in the future"

### Güncellik / Freshness

- **Elle güncelleme / Manual update:** Her PR'da kontrol et / Check on every PR
- **Otomatik güncelleme / Auto-update:** CI/CD ile enforce et / Enforce via CI/CD
- **Review sıklığı / Review frequency:** Haftalık / Weekly during active development

---

## 📞 Yardım / Help

**Sorunlar / Issues:**

```bash
# Generator çalışmıyorsa / If generator doesn't work
npm install -D tsx glob
npm run generate:catalog

# JSON geçersizse / If JSON is invalid
jq . docs/feature-registry.json

# Markdown bozuksa / If markdown is broken
cat docs/feature-catalog.md | head -50
```

**İletişim / Contact:**

- 📧 RentOrgin Dev Team
- 📚 Docs: `docs/`
- 🐛 Issues: GitHub Issues

---

**Son Güncelleme / Last Updated:** 2026-02-16  
**Version:** v1.0.0  
**Maintainer:** RentOrgin Dev Team
