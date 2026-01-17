#!/bin/bash

# PostgreSQL Başlatma Scripti
# PostgreSQL Startup Script

echo "🔍 PostgreSQL durumu kontrol ediliyor..."

# Check if PostgreSQL is already running
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "✅ PostgreSQL zaten çalışıyor!"
    exit 0
fi

echo "⚠️  PostgreSQL çalışmıyor. Başlatılıyor..."

# Try different methods to start PostgreSQL
# Method 1: Try Homebrew services
if command -v brew > /dev/null 2>&1; then
    echo "📦 Homebrew ile başlatılıyor..."
    brew services restart postgresql@14 2>&1 || {
        echo "❌ Homebrew services başarısız, alternatif yöntem deneniyor..."
        
        # Method 2: Try pg_ctl directly
        if command -v pg_ctl > /dev/null 2>&1; then
            # Try common data directories
            for data_dir in \
                "/opt/homebrew/var/postgresql@14" \
                "/usr/local/var/postgresql@14" \
                "$HOME/var/postgresql@14"
            do
                if [ -d "$data_dir" ]; then
                    echo "📁 Data directory bulundu: $data_dir"
                    echo "🚀 pg_ctl ile başlatılıyor..."
                    pg_ctl -D "$data_dir" start 2>&1
                    sleep 2
                    if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
                        echo "✅ PostgreSQL başarıyla başlatıldı!"
                        exit 0
                    fi
                fi
            done
        fi
    }
fi

# Check if it's running now
sleep 2
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "✅ PostgreSQL başarıyla başlatıldı!"
    exit 0
else
    echo "❌ PostgreSQL başlatılamadı!"
    echo ""
    echo "🔧 Manuel başlatma adımları:"
    echo "1. PostgreSQL data directory'yi bulun:"
    echo "   find /opt/homebrew /usr/local -name 'postgresql@14' -type d"
    echo ""
    echo "2. Manuel olarak başlatın:"
    echo "   pg_ctl -D <data_directory> start"
    echo ""
    echo "3. Veya Homebrew ile:"
    echo "   brew services restart postgresql@14"
    echo ""
    echo "4. Veya PostgreSQL'i yeniden yükleyin:"
    echo "   brew reinstall postgresql@14"
    exit 1
fi









