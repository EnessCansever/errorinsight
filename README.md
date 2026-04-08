# ErrorInsight

ErrorInsight, konsoldaki hata mesajlarini analiz eden sade bir full stack uygulamasidir. Girilen hata mesaji ve opsiyonel kod parcasi Gemini ile yorumlanir; sonuc Turkce ozet, nedenler, cozum adimlari ve ornek duzeltilmis kod olarak dondurulur. Basarili analizler MongoDB gecmisine kaydedilir.

## Ozellikler
- Hata mesaji ve opsiyonel kod parcasi ile analiz
- Gemini tabanli Turkce aciklama ve cozum onerileri
- Kategori, kisa ozet, muhtemel nedenler ve adim adim cozum akisi
- Basarili analizlerin MongoDB'ye kaydedilmesi
- Gecmis sayfasinda son analizleri listeleme ve detay goruntuleme
- Sade ve portfolyo sunumuna uygun arayuz

## Kullanilan Teknolojiler
- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express.js, Mongoose
- AI: Google GenAI (`@google/genai`)
- Database: MongoDB

## Kurulum
1. Kok dizindeki `.env.example` dosyasini kendi `.env` dosyaniz olarak kopyalayin.
2. Frontend icin:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Backend icin:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Yerel calistirmada frontend varsayilan olarak `http://localhost:5173`, backend ise `http://localhost:3001` uzerinden calisir.

## Environment Variables

Backend ve frontend icin kullanilan temel degiskenler:

- `PORT`: Backend portu, varsayilan `3001`
- `MONGODB_URI`: MongoDB baglanti adresi
- `GEMINI_API_KEY`: Gemini API anahtari
- `GEMINI_MODEL`: Opsiyonel model adi, varsayilan `gemini-2.5-flash`
- `VITE_API_BASE_URL`: Frontend'in baglanacagi API adresi, varsayilan `http://localhost:3001`

MongoDB icin ornek URI:

- `mongodb://127.0.0.1:27017/errorinsight`

## Ornek Kullanim Akisi
1. `Analyze` sayfasini ac.
2. Hata mesajini gir.
3. Gerekirse ilgili kod parcasi ekle.
4. `Analiz Et` butonuna bas.
5. Sonucu incele ve cozum adimlarini kontrol et.
6. Basarili analizler `History` sayfasinda listelenir.

## Klasor Yapisi

```text
frontend/
  src/
    components/   # Yeniden kullanilan arayuz parcalari
    layout/        # Sayfa yerlesimi
    pages/         # Ana sayfalar
    services/      # Frontend API istekleri
backend/
  src/
    config/        # Veritabani ve uygulama ayarlari
    controllers/   # HTTP katmani
    models/        # Mongoose modelleri
    routes/        # API route tanimlari
    services/      # Analiz ve is mantigi
    utils/         # Yardimci fonksiyonlar
```

## Gelistirici Notu

Bu proje bilerek junior seviyede, sade ve okunabilir tutuldu. Ama tamamen oyuncak bir demo degil; hata analizi, Gemini entegrasyonu ve MongoDB gecmisi ile gercek bir problemi cozmeye odaklanan portfolyo projesi olarak tasarlandi. Agir mimariler, auth, dashboard ve benzeri ekstra katmanlar bilerek eklenmedi.