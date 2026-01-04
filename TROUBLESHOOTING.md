# 🔧 Sorun Giderme Rehberi

## Localhost'a Erişilemiyor

### Sorun: Backend ve Frontend çalışıyor ama localhost'ta erişilemiyor

### Çözüm Adımları:

#### 1. Process'leri Kontrol Edin

```bash
# Çalışan process'leri görün
lsof -ti:3000,3001,3002 | xargs ps -p

# Port'ları kontrol edin
./check-ports.sh
```

#### 2. Process'leri Temizleyin ve Yeniden Başlatın

```bash
# Tüm process'leri durdurun
lsof -ti:3000,3001,3002 | xargs kill -9

# Otomatik başlatma scriptini kullanın
./start-dev.sh
```

#### 3. Manuel Başlatma

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run start:dev
```

Başarılı olursa göreceksiniz:
```
🚀 RentOrgin API is running!
📡 Port: 3002
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

Başarılı olursa göreceksiniz:
```
▲ Next.js 14.2.33
- Local: http://localhost:3000
```

#### 4. Port Çakışması Kontrolü

Eğer port kullanımda hatası alıyorsanız:

```bash
# Port'u kullanan process'i bulun
lsof -ti:3000  # Frontend için
lsof -ti:3002  # Backend için

# Process'i durdurun
kill -9 <PID>
```

#### 5. Network Binding Sorunları

Eğer process'ler çalışıyor ama erişilemiyor:

1. **Firewall kontrolü:**
   ```bash
   # macOS'ta firewall'u kontrol edin
   sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
   ```

2. **127.0.0.1 vs localhost:**
   - Bazı durumlarda `localhost` yerine `127.0.0.1` kullanmayı deneyin
   - Browser'da `http://127.0.0.1:3000` adresini açın

3. **Host dosyası kontrolü:**
   ```bash
   cat /etc/hosts | grep localhost
   ```

#### 6. Backend API Port Uyumsuzluğu

Backend `.env` dosyasında `API_PORT=3002` olabilir ama frontend `3001` bekliyor olabilir.

**Çözüm:**
- Backend `.env`: `API_PORT=3002`
- Frontend `next.config.js` veya `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1`

#### 7. Next.js Build Sorunları

Eğer Next.js başlamıyorsa:

```bash
cd apps/web
rm -rf .next
npm run dev
```

#### 8. Database Bağlantı Sorunları

Backend başlamıyorsa database'i kontrol edin:

```bash
# PostgreSQL çalışıyor mu?
pg_isready -h 127.0.0.1 -p 5432

# Database var mı?
psql -h 127.0.0.1 -p 5432 -U $(whoami) -d rentorgin_dev -c "SELECT 1"
```

## Hızlı Test

```bash
# Backend test
curl http://localhost:3002/api/v1/health

# Frontend test
curl http://localhost:3000
```

## Log Kontrolü

```bash
# Backend log
tail -f apps/api/logs/*.log

# Frontend log (terminal çıktısı)
# Frontend terminal'inde hataları kontrol edin
```

## Yaygın Hatalar

### "Port already in use"
```bash
lsof -ti:PORT | xargs kill -9
```

### "Cannot connect to database"
```bash
# PostgreSQL'i başlatın
pg_ctl -D /opt/homebrew/var/postgresql@14 start
```

### "Module not found"
```bash
# Node modules'u yeniden yükleyin
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
```








