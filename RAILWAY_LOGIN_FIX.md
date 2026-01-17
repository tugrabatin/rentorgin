# 🔧 Railway CLI Login Hatası Çözümü

## ❌ HATA
```
Error logging in to CLI. Please try again with `--browserless`
```

## ✅ ÇÖZÜM

Railway CLI'ye `--browserless` flag'i ile login olun ve token kullanın:

### Adım 1: Railway Dashboard'dan Token Oluştur

1. https://railway.app/dashboard adresine git
2. Sağ üst köşede **Settings** (⚙️) → **Tokens** sekmesi
3. **Create Token** butonuna tıkla
4. Token'a bir isim ver (örn: "CLI Token")
5. Token'ı kopyala (sadece bir kez gösterilir!)

### Adım 2: CLI ile Login

```bash
npx @railway/cli login --browserless
```

Terminal şunu soracak:
```
? Enter your Railway API token:
```

Kopyaladığın token'ı yapıştır ve Enter'a bas.

### Adım 3: Login Kontrolü

```bash
npx @railway/cli whoami
```

Eğer email adresin görünüyorsa, login başarılı! ✅

---

## 📝 GÜNCELLENMİŞ DEPLOY KOMUTLARI

```bash
# ============================================
# ADIM 1: Railway CLI Login (Browserless)
# ============================================
# Önce Railway dashboard'dan token oluştur:
# https://railway.app/dashboard → Settings → Tokens → Create Token

npx @railway/cli login --browserless
# Token'ı yapıştır

# Login kontrolü
npx @railway/cli whoami

# ============================================
# ADIM 2: Railway Projesi ve PostgreSQL Oluştur
# ============================================
npx @railway/cli init
# Sorular:
# ✓ Project name? → rentorgin-api
# ✓ Environment? → production

npx @railway/cli add postgresql

# ============================================
# ADIM 3: Backend Service Deploy
# ============================================
cd apps/api
npx @railway/cli link
npx @railway/cli up

# Railway URL'ini not et
# BACKEND_URL="https://YOUR-RAILWAY-URL.up.railway.app"

# ... (diğer adımlar aynı)
```

---

## 🔄 ALTERNATIF: Browser ile Login (Eğer çalışırsa)

Eğer browser açılabiliyorsa:

```bash
npx @railway/cli login
# Browser otomatik açılır, GitHub ile login ol
```

Ancak genellikle `--browserless` daha güvenilir.
