# 🔧 Vercel Deploy Path Hatası Çözümü

## ❌ HATA
```
Error: The provided path "~/Desktop/rentorgin/Users/tugra/Desktop/rentorgin" does not exist.
```

## ✅ ÇÖZÜM

Vercel'e directory sorulduğunda **sadece relative path** kullanın:

### Doğru Cevap:
```
? In which directory is your code located? ./apps/web
```

**VEYA** root'tan deploy etmek istiyorsanız:
```
? In which directory is your code located? ./
```

## 📝 DOĞRU DEPLOY ADIMLARI

```bash
cd /Users/tugra/Desktop/rentorgin

# Vercel deploy
npx vercel

# Sorular:
# ✓ Set up and deploy? → Y
# ✓ Which scope? → (Hesabını seç)
# ✓ Link to existing project? → N
# ✓ Project name? → rentorgin-web
# ✓ In which directory is your code located? → ./apps/web  ← BURASI ÖNEMLİ!
# ✓ Override settings? → Y
#   - Build Command: npm run build --workspace=apps/web
#   - Output Directory: .next
#   - Install Command: npm install
#   - Development Command: npm run dev --workspace=apps/web

# Production deploy
npx vercel --prod
```

## 🎯 ÖNEMLİ NOT

Vercel zaten `/Users/tugra/Desktop/rentorgin` dizininde çalışıyor, bu yüzden:
- ❌ `./Users/tugra/Desktop/rentorgin` (YANLIŞ - absolute path)
- ✅ `./apps/web` (DOĞRU - relative path)
