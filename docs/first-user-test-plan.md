# Fixora First User Test Plan

Bu doküman Fixora için yapılacak ilk küçük kullanıcı testi / reklam testi (pilot) için planı içerir. Amaç, ürünün temel değerinin ilk kullanıcılar tarafından anlaşılıp anlaşılmadığını, analiz akışının tamamlanıp tamamlanmadığını ve sonuçların faydalı bulunup bulunmadığını hızlıca ölçmektir.

## 1. Amaç
- Fixora'nın ilk kullanıcılar tarafından anlaşılıp anlaşılmadığını ölçmek.
- Kullanıcıların analiz akışını yardım almadan tamamlayıp tamamlayamadığını görmek.
- Analiz sonucunun pratikte faydalı bulunup bulunmadığını anlamak.
- Kapsam/FAQ metinlerinin beklentiyi doğru yönetip yönetmediğini kontrol etmek.

## 2. Hedef Kullanıcı Profili
- Junior frontend geliştiriciler
- React / JavaScript öğrenenler
- İngilizce hata mesajlarında zorlanan yazılımcılar
- Bootcamp / kurs öğrencileri
- Basit full-stack proje geliştirenler

## 3. Test Edilecek Ana Akış
Kullanıcıdan aşağıdaki adımları manuel olarak denemesi istenecek:
1. Ana sayfayı aç (ör: getfixora.dev).
2. Site ne işe yaradığını kısa sürede anla.
3. Kayıt ol veya giriş yap (varsa).
4. Gerçek bir hata mesajını Analyze sayfasına yapıştır.
5. İstersen ilgili kod parçasını ekle.
6. Analiz sonucunu dikkatle incele.
7. History sayfasından kaydı tekrar aç.
8. Share link oluştur, gizli sekmede aç ve dışarıdan görüntülenebilirliği kontrol et.
9. Error Guide sayfalarından birini incele.

## 4. Kullanıcıya Gönderilecek Kısa Mesaj
Merhaba — Fixora'nın kısa bir pilotuna davetlisin. Sistemi hızlıca test edip gerçek bir hata mesajı ile deneyebilir misin? Aşağıdakileri dene: 1) getfixora.dev'ye git, 2) bir hata mesajını Analyze sayfasına yapıştır, 3) sonucu incele ve kısa geri bildirim gönder. 5–10 dakikanı alır. Teşekkürler!

## 5. Geri Bildirim Soruları
- Siteye ilk girince ne işe yaradığını anladın mı?
- Hangi hata mesajını denedin? (kısa örnek)
- Analiz sonucu hatayı anlamanı kolaylaştırdı mı?
- Çözüm adımları uygulanabilir miydi?
- Açıklama uzunluğu nasıldı (kısa/uygun/uzun)?
- Kod örneği işine yaradı mı?
- Hangi noktada takıldın veya karışık buldun?
- Hangi dillerde/hatalarda çalıştığı senin için net miydi?
- Tekrar kullanır mısın?
- Bir arkadaşına önerir misin?
- En eksik bulduğun şey neydi?

## 6. Başarı Kriterleri
- Kullanıcıların çoğu ürünün ne işe yaradığını ilk 10–15 saniyede anlayabilmeli.
- Kullanıcı analiz akışını yardım almadan tamamlayabilmeli.
- Analiz sonucu kullanıcıların en az %60–70'i için “işe yarar” bulunmalı (kalitatif geri bildirim).
- Kullanıcılar kapsam/kısıtlamaları yanlış anlamamalı; “tüm dillerde kusursuz” gibi beklenti oluşmamalı.
- Share link ve history akışları temel kullanıcılara karışık gelmemeli.

## 7. İzlenecek Metrikler
- Landing → Analyze buton tıklaması oranı
- Register / Login tamamlanma sayısı
- Analyze started (başlatılan analiz sayısı)
- Analyze completed (başarıyla sonuçlanan analiz sayısı)
- Analyze failed (hata ile sonuçlanan analiz sayısı)
- History visited
- Share link oluşturma sayısı
- Share link açılma sayısı
- Katılımcıların yazılı/sözlü geri bildirimleri

Not: Eğer analytics entegrasyonu yoksa bu metrikler başlangıçta manuel olarak (test oturumları, Google Sheet) toplanabilir.

## 8. Test Sonrası Karar Seçenekleri
- Ürün anlaşılıyor ama analiz kalitesi zayıfsa: prompt/AI ve sonuç normalize etme iyileştirilecek.
- Ürün anlaşılmıyorsa: landing ve hero kopyası sadeleştirilecek.
- Kullanıcı akışında takılma varsa: UX/microcopy ve buton yerleşimleri düzeltilecek.
- Kullanıcı “tekrar kullanırım” derse: küçük reklam/LinkedIn hedefli paylaşım denenecek.
- Kapsam yanlış anlaşılıyorsa: FAQ/kapsam metni güçlendirilecek.

## 9. Şimdilik Yapılmayacaklar
- Premium / ödeme planları
- Public API üretime alma
- VS Code extension geliştirme
- CLI geliştirme
- Chrome extension geliştirme
- Büyük redesign veya büyük backend refactor

## 10. İlk Test İçin Önerilen Minimum Plan
- Katılımcı sayısı: 5–10 kişi (manuel davet).
- Her katılımcıdan gerçek bir hata mesajı ile giriş yapması istenecek.
- Her kullanıcı sonrası kısa (10 soruluk) geri bildirim alınacak.
- Tüm sonuçlar tek bir dokümanda toplanıp analiz edilecek.
- 1–2 küçük ürün/microcopy düzeltmesi yapılacak, sonra ikinci tur küçük pilot düşünülecek.

---

Bu plan hızlı uygulanabilir ve düşük maliyetlidir; hedef ilk kullanıcı sinyallerini alıp, hangi alanlara öncelik verileceğine hızlı karar verebilmektir.
