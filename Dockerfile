# Temel imaj
FROM node:18

# Çalışma dizini
WORKDIR /app

# Backend package.json ve package-lock.json dosyalarını kopyala
COPY src/api/package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Portu aç
EXPOSE 5001

# Uygulamayı başlat
CMD ["node", "src/api/server.js"] 