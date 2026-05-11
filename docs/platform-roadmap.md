# Fixora Platform Roadmap

Bu belge Fixora'nın mevcut web uygulaması perspektifinden olası platform yönlerini (Public API, VS Code uzantısı, CLI, Chrome uzantısı vb.) teknik ve ürün açısından değerlendirir. Amaç kısa vadede ne yapılmayacağını net belirleyip orta/uzun vadeli seçeneklerin artılarını, eksilerini ve teknik gereksinimlerini ortaya koymaktır.

## 1. Current Product

Fixora şu anda web uygulaması olarak çalışır. Temel davranışlar:

- Kullanıcılar İngilizce hata mesajını ve isteğe bağlı olarak ilgili kod parçasını web formuna yapıştırır.
- Sistem Türkçe açıklama, kategori, kısa özet, muhtemel nedenler, uygulanabilir çözüm adımları, örnek fix kodu ve ek notlar üretir.
- Mevcut özellikler arasında kimlik doğrulama (auth), analiz geçmişi (history), paylaşılabilir linkler (share), SEO odaklı hata rehberi, sitemap ve sayfa düzeyinde performans iyileştirmeleri ile bir miktar FAQ/kapsam metni bulunur.

Ana değer önerisi: Hızlı, uygulanabilir hata tanımlama ve çözüm adımları sağlayarak özellikle JavaScript/React/Node.js ve web/API/build hatalarında geliştiricinin hata çözme süresini kısaltmak.

## 2. Why Platform Direction Matters

Web form basit ve erişilebilir bir başlangıçtır ancak geliştiricilerin iş akışları genellikle editör, CI/CD ve otomasyon araçları etrafında döner. Platform bileşenleri (API, SDK, uzantılar) entegrasyon kolaylığı, tekrarlanabilir kullanım ve daha geniş benimseme sağlar. Ayrıca kurumsal kullanım ve otomasyon senaryoları ancak iyi tanımlanmış bir platformla ölçeklenebilir.

Platformlaşma, kullanıcıların Fixora'yı yalnızca bir defalık web aracı olarak değil; günlük araç zincirlerinde yer alan bir parça haline getirme şansı sunar. Bu nedenle hangi yolların önce keşfedileceği stratejik önem taşır.

## 3. Option 1: Public API

Public API, Fixora'nın programatik olarak çağrılabilmesini sağlar. Temel faydalar, kullanıcılar ve gereksinimler:

- Ne sağlar: CI işleri, monitoring/alert entegrasyonları, üçüncü parti uygulamalar ve uzantılar aracılığıyla analiz yeteneği sunar.
- Kim kullanır: Kurumlar, SRE/DevOps ekipleri, entegrasyon geliştiricileri, VS Code/IDE uzantıları ve otomasyon script'leri.

Artıları:

- Entegrasyon kolaylığı ve genişlemeye açık mimari.
- Potansiyel gelir modeli (kotalı kullanım, kurumsal planlar).

Eksileri / Riskleri:

- Abuse ve otomasyon riskleri (spam istekler, maliyet patlaması).
- LLM çağrı maliyetleri ve beklenmedik faturalama riski.
- Güvenlik, veri gizliliği ve operasyonel yük artışı.

Zorunlu teknik gereksinimler (kısa liste):

- API key yönetimi (issue/revoke, org/project scope).
- Rate limiting ve quota yönetimi per-key (user/project düzeyinde).
- Abuse protection: anomaly detection, throttling, allow/deny listeler.
- Versiyonlu uç nokta planı (örn. `/v1/analyze`) ve geri uyumluluk stratejisi.
- Geliştirici dokümantasyonu ve örnek SDK/SDK şablonları.
- Logging & monitoring; hassas içerik maskelenerek saklanmalı.
- Billing/freemium planlama ve faturalama altyapısı.
- Yönetim paneli/telemetri (kota, kullanım, hata oranları).

Özel not: Gemini/LLM maliyeti ve quota riski başlıca operasyonel maliyet etkenidir; API açmadan önce maliyet kontrolü ve abuse senaryoları planlanmalıdır.

## 4. Option 2: VS Code Extension

VS Code uzantısı geliştirici deneyimi açısından doğal bir adrestir. Özellikle hata çözme akışı editör içinde gerçekleşiyorsa kullanıcılar için daha düşük sürtünme sağlar.

- Kullanım: Geliştirici hata mesajını veya stack trace'i seçer, sağ tık veya komut paletinden "Analyze with Fixora" seçeneğiyle hızlı analiz alır.
- UX avantajı: Web formu açmaya gerek kalmaz; bağlam (dosyadaki kod, açık dosya) doğrudan kullanılabilir.
- Teknik bağımlılık: Uzantı backend'e çağrı yapabilir; başlangıçta public API olmadan da mevcut backend üzerinde authenticated proxy veya özel entegrasyonla çalıştırılabilir.
- Strateji: Orta vadede public API'den önce test edilmesi önerilir — daha az geniş risk, hızlı geri bildirim ve kullanıcı kabulünü ölçme imkânı sağlar.

## 5. Option 3: CLI

CLI, script ve CI entegrasyonları için uygundur; geliştiricilerin terminal tabanlı iş akışlarına uyum sağlar.

Örnek kullanım:

```
fixora check "Cannot read properties of undefined (reading 'map')"
```

Avantajlar:

- CI/CD hatalarında otomatik analiz eklenebilir.
- Teknik ve ileri kullanıcılar için düşük sürtünme.

Sınırlamalar:

- Discovery ve benimseme VS Code uzantısı kadar kolay olmayabilir.
- Dağıtım, versiyonlama ve platform bağımlılıkları yönetimi gerekir.

## 6. Option 4: Chrome Extension

Fırsat: Tarayıcı konsol hatalarını yakalayarak tek tıkla analiz göndermek kullanıcı deneyimi açısından çekici olabilir.

Neden şu an öncelik olmamalı:

- Uzantı izinleri, güvenlik ve tarayıcı uyumluluğu karmaşıklığı getirir.
- Dağıtım ve bakım maliyetleri (birden fazla tarayıcı/versiyon desteği).
- İlk ürün için getireceği fayda / maliyet oranı muhtemelen daha düşük.

## 7. Recommended Order

Önerilen adımlar:

1. Web app stabilizasyonu (performans, güvenlik, logging/telemetry).
2. Gerçek kullanıcı / small-batch testi; kullanıcı davranışı gözlemi.
3. Feedback toplama ve kullanım senaryolarını ayrıştırma.
4. VS Code extension feasibility çalışması ve pilot kullanıcı testi.
5. Public API tasarım dokümanı hazırlanması (rate limit, quota, billing, versioning).
6. Karar: Extension mı, API mı, yoksa her ikisi mi önce yayına alınacak.

## 8. Not Now / Out of Scope

Kısa vadede yapılmayacaklar (karar bilinçli şekilde ertelenir):

- Public API'nin üretime alınması ve public dağıtım kodunun yazılması.
- API key yönetimi ve ödeme/premium altyapısının hazırlanması.
- VS Code / CLI / Chrome extension geliştirmesi (araştırma/prototip hariç).
- Büyük backend refactorları veya LLM mimarisi değişiklikleri.

## 9. Risks

- Gemini/LLM quota ve abuse riski; kontrolsüz istek artışı maliyeti yükseltir.
- Yetersiz rate limiting tasarımı beklenmedik maliyet arttırabilir.
- API açmak gizlilik ve kod snippet güvenliği riskleri getirir.
- Ürün odağının dağılması; çok sayıda paralel proje erken aşamada büyümeyi baltalayabilir.
- Erken platformlaşma web app geliştirme hızını yavaşlatabilir.

## 10. Future Technical Requirements

- API key sistemi ve project/user bazlı quota yönetimi.
- Request logging; sensitive content (kod/snippet) maskelenerek saklanmalı.
- Billing readiness ve faturalama metrikleri.
- Versioned API routes ve migration/compatibility planı.
- Developer docs, SDK örnekleri ve hızlı başlangıç rehberi.
- SDK/CLI prototipleri ve VS Code extension referans implementasyonu.
- Monitoring, alerting ve abuse detection sistemleri.

---

Bu belge ürün ve mühendislik kararlarını yönlendirmek amaçlıdır; kısa vadede yapılmayacakların net olması, scope creep'i engeller ve ileride atılacak adımların önceliklendirilmesini kolaylaştırır.

