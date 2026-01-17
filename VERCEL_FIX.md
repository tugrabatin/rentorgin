# 🔧 Vercel Build Hatası Çözümü

## ❌ HATA
```
npm error No workspaces found:
npm error   --workspace=apps/web
```

## 🔍 SORUN

Vercel'e `apps/web` directory'si root olarak verilmiş, ama build command `npm run build --workspace=apps/web` çalıştırılmaya çalışılıyor. Bu yanlış çünkü zaten `apps/web` içindeyiz.

## ✅ ÇÖZÜM 1: Vercel Dashboard'dan Düzelt (ÖNERİLEN)

1. Vercel Dashboard'a git: https://vercel.com/tugrabatins-projects/basisdeploy/settings
2. **General** sekmesine git
3. **Build & Development Settings** bölümünde:
   - **Root Directory**: `apps/web` (zaten doğru)
   - **Build Command**: `npm run build` (workspace komutunu kaldır)
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && npm install` (root'tan install yap)

4. **Save** butonuna tıkla
5. **Deployments** sekmesine git → En son deployment'ı seç → **Redeploy**

## ✅ ÇÖZÜM 2: Vercel CLI ile Düzelt

```bash
cd /Users/tugra/Desktop/rentorgin

# Mevcut projeyi unlink et
rm -rf .vercel

# Yeniden link et, bu sefer root directory olarak . (nokta) ver
npx vercel link

# Sorular:
# ✓ Set up and deploy? → Y
# ✓ Which scope? → tugrabatin's projects
# ✓ Link to existing project? → Y
# ✓ What's your project's name? → basisdeploy
# ✓ In which directory is your code located? → .  ← ROOT DİZİN!

# Sonra deploy
npx vercel --prod
```

Bu durumda root'taki `vercel.json` kullanılacak ve build command doğru çalışacak.

## ✅ ÇÖZÜM 3: apps/web/vercel.json Kullan (Hızlı)

`apps/web/vercel.json` dosyası oluşturuldu. Vercel otomatik olarak bunu kullanacak.

**Ancak** Vercel Dashboard'dan ayarları manuel güncellemek daha garantili.

## 📝 ÖNERİLEN AYARLAR (Vercel Dashboard)

- **Root Directory**: `apps/web`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `cd ../.. && npm install`
- **Framework Preset**: Next.js

## 🚀 Sonraki Adım

Ayarları düzelttikten sonra:

```bash
npx vercel --prod
```

VEYA Vercel Dashboard'dan **Redeploy** yap.
