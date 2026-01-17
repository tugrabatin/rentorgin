# 🔧 Netlify Init Hatası Çözümü

## ❌ HATA
```
No matching project found with the remote https://github.com/tugrabatin/rentorgin.
```

## ✅ ÇÖZÜM

Netlify'de henüz site yok, yeni site oluşturman gerekiyor.

### Adım 1: Netlify Init (Yeni Site Oluştur)

```bash
npx netlify-cli init
```

**Sorulara şu şekilde cevap ver:**

1. **Select the project**: 
   - `@rentorgin/api` (apps/api) seç
   - VEYA `Create & configure a new site` seç

2. **What would you like to do?**:
   - `Create & configure a new site` seç (mevcut proje yoksa)

3. **Team**: 
   - Hesabını seç

4. **Site name?**: 
   - `rentorgin-api` (veya istediğin isim)

5. **Build command**: 
   - `npm install && npm run build --workspace=apps/api`

6. **Directory to deploy**: 
   - `.netlify` (veya boş bırak)

7. **Netlify functions folder**: 
   - `netlify/functions`

### Adım 2: Alternatif - Manuel Site Oluşturma

Eğer init çalışmazsa, Netlify Dashboard'dan manuel oluştur:

1. https://app.netlify.com adresine git
2. **Add new site** → **Import an existing project**
3. **Deploy manually** seç
4. Site name: `rentorgin-api`
5. **Site settings** → **Build & deploy**:
   - Build command: `npm install && npm run build --workspace=apps/api`
   - Publish directory: `.netlify` (veya boş)
   - Functions directory: `netlify/functions`
6. **Site settings** → **Environment variables** → Gerekli env'leri ekle

Sonra local'de link et:
```bash
npx netlify-cli link
# Site name: rentorgin-api
```

### Adım 3: Deploy

```bash
npx netlify-cli deploy --prod
```

---

## 📝 NOTLAR

- Netlify init sırasında "No matching project found" normal (henüz site yok)
- "Create & configure a new site" seçerek yeni site oluştur
- Site oluşturulduktan sonra URL otomatik oluşur: `https://rentorgin-api.netlify.app`
