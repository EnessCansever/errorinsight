# Fixora

Fixora, geliştiricilerin karşılaştığı İngilizce hata mesajlarını saniyeler içinde Türkçe, sade ve uygulanabilir çözümlere dönüştüren yapay zekâ destekli bir araçtır.

## Proje Tanımı

Fixora, hata mesajlarını hızlıca anlamlandırmayı zorlaştıran teknik dil sorununu çözmeyi hedefler. Özellikle junior geliştiriciler için, hata metninin ne anlama geldiğini ve nasıl çözüleceğini anlaşılır bir akışta sunar.

Çalışma akışı basittir:
1. Kullanıcı hata mesajını ve isterse ilgili kod parçasını girer.
2. Sistem hatayı analiz eder ve uygun kategoriye yerleştirir.
3. Türkçe açıklama, muhtemel nedenler, çözüm adımları ve örnek kod çıktısı üretir.
4. Analiz sonucu geçmişe kaydedilir ve tekrar görüntülenebilir.

## 🔗 Canlı Demo

Yakında: https://fixora.com

## Özellikler

- **Hata analizi:** İngilizce hata mesajını teknik bağlamıyla birlikte yorumlar  
- **Türkçe açıklama:** Hatanın ne anlama geldiğini sade ve anlaşılır biçimde açıklar  
- **Muhtemel nedenler:** Hatanın oluşmasına yol açabilecek başlıca sebepleri listeler  
- **Çözüm adımları:** Uygulanabilir, net ve sıralı çözüm önerileri sunar  
- **Örnek kod:** Düzeltilmiş örnek kod ile çözümü somutlaştırır  
- **History sistemi:** Analiz sonuçlarını kaydeder ve geçmişten tekrar erişim sağlar  
- **Rate limiting:** API kötüye kullanımını azaltmak için istek sınırlandırması uygular  
- **Cache mantığı:** Aynı analiz isteğinde gereksiz AI çağrısını azaltmak için tekrar kullanım kontrolü yapar  
- **Dark mode UI:** Açık/koyu tema desteğiyle uzun kullanımda daha rahat bir deneyim sunar  

## Kullanılan Teknolojiler

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- React Hot Toast
- React Syntax Highlighter

### Backend
- Node.js
- Express.js
- Mongoose
- express-rate-limit

### AI
- Google Gemini API

### Database
- MongoDB

## Kurulum


### 1) Projeyi klonla

```bash
git clone <repo-url>
cd fixora
```

### 2) Backend kurulumu

```bash
cd backend
npm install
npm run dev
```

### 3) Frontend kurulumu

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/fixora
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Kullanım

1. Analyze sayfasına git.
2. İngilizce hata mesajını gir.
3. İstersen ilgili kod parçasını ekle.
4. Analiz Et butonuna tıkla.
5. Üretilen Türkçe açıklamayı, nedenleri ve çözüm adımlarını incele.
6. İhtiyaç halinde History sayfasından geçmiş analizlerine geri dön.

## Proje Yapısı

```text
frontend/
  src/
    components/
    layout/
    pages/
    services/

backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
    utils/
```

## Proje Felsefesi

Fixora bilinçli olarak:
- sade,
- odaklı,
- sürdürülebilir

bir yapıda geliştirilir.

Proje, gereksiz karmaşık mimarilerden kaçınır; temel problemi net şekilde çözen, okunabilir ve geliştirilebilir bir ürün yaklaşımını benimser.

## Yol Haritası

- [ ] Deploy ve domain yayını
- [ ] SEO ve paylaşım önizleme iyileştirmeleri
- [ ] Kullanıcı geri bildirim akışı
- [ ] Paylaşılabilir analiz bağlantıları
- [ ] Performans ve bundle optimizasyonu

## Geliştirici

Bu proje, modern web teknolojileri ve yapay zekâ entegrasyonunu pratik bir ürün senaryosunda birleştirmek amacıyla geliştirildi.

Odak noktası:
- gerçek dünya problemlerine çözüm üretmek,
- sade ama etkili kullanıcı deneyimi sunmak,
- proje ölçeğini kontrollü şekilde büyütmek.

## Kapanış

Fixora işine yaradıysa ⭐ vererek destek olabilirsin.