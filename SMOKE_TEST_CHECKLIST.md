# Fixora Production Smoke Test Checklist

Deploy sonrası production ortamını hızlı ve sistemli doğrulamak için kontrol listesi.

## Domain ve yönlendirme
- [ ] `https://getfixora.dev` sorunsuz açılıyor
- [ ] `http://getfixora.dev` otomatik olarak HTTPS’e yönleniyor
- [ ] `https://www.getfixora.dev` ana domaine yönleniyor
- [ ] `https://www.getfixora.dev/history` açıldığında adres çubuğu `https://getfixora.dev/history` oluyor
- [ ] Redirect döngüsü veya SSL uyarısı yok

## Ana sayfa
- [ ] Ana sayfa sorunsuz açılıyor
- [ ] Navbar, footer ve ana içerik eksiksiz görünüyor
- [ ] Boş ekran, kırık layout veya taşma yok
- [ ] Masaüstü ve mobil görünüm temel olarak düzgün çalışıyor

## Analyze akışı
- [ ] Analyze sayfası açılıyor
- [ ] Hata mesajı girilip analiz başlatılabiliyor
- [ ] Kod parçası ile analiz başlatılabiliyor
- [ ] Yükleme sırasında kullanıcıya net geri bildirim gösteriliyor
- [ ] Başarılı analiz sonrası sonuç kartı doğru şekilde görünüyor
- [ ] Boş veya geçersiz girişte anlaşılır hata mesajı gösteriliyor

## History akışı
- [ ] History sayfası açılıyor
- [ ] İlk açılışta liste otomatik yükleniyor
- [ ] Kayıtlar listede görünür şekilde geliyor
- [ ] Bir kayıt seçildiğinde ilgili detay açılıyor
- [ ] Liste yüklenemezse hata alanı görünüyor
- [ ] Retry butonu çalışıyor ve listeyi yeniden deniyor

## History detay ve silme
- [ ] Seçili kaydın detayı doğru şekilde açılıyor
- [ ] Farklı kayıt seçildiğinde detay doğru şekilde güncelleniyor
- [ ] Detay yüklenirken ekran gereksiz sert şekilde boşalmıyor
- [ ] Seçili olmayan kayıt silindiğinde liste güncelleniyor
- [ ] Seçili kayıt silindiğinde yeni seçim güvenli şekilde yapılıyor
- [ ] Silme başarısız olursa kullanıcıya uygun hata mesajı gösteriliyor

## Deep link ve refresh
- [ ] `https://getfixora.dev/analyze` doğrudan açılıyor
- [ ] `https://getfixora.dev/history` doğrudan açılıyor
- [ ] Analyze sayfası yenilendiğinde 404 oluşmuyor
- [ ] History sayfası yenilendiğinde 404 oluşmuyor
- [ ] Deep link açılışında uygulama doğru şekilde yükleniyor

## Feedback
- [ ] Olumlu geri bildirim gönderilebiliyor
- [ ] Olumsuz geri bildirim gönderilebiliyor
- [ ] Feedback sonrası kullanıcıya başarı bildirimi gösteriliyor
- [ ] Tekrarlayan tıklamalarda beklenmeyen çift gönderim oluşmuyor

## Temel hata durumları
- [ ] Backend erişilemezse kullanıcı dostu ağ hatası gösteriliyor
- [ ] 4xx/5xx cevaplarda anlaşılır hata mesajı gösteriliyor
- [ ] Geçersiz veya JSON olmayan yanıtlar uygulamayı kırmıyor
- [ ] Beklenmeyen hata durumlarında sayfa tamamen boşalmıyor

## Son kontrol
- [ ] Tarayıcı konsolunda kritik JavaScript hatası yok
- [ ] Network tab’ında temel API istekleri beklendiği gibi çalışıyor
- [ ] Uygulama genel olarak tutarlı ve stabil davranıyor
