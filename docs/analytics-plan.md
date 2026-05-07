# Fixora Analytics Plan

## 1. Amaç

Fixora için analytics, reklamdan veya dış kaynaklardan gelen kullanıcının ürün içinde nerede ilerlediğini ve nerede kaybolduğunu anlamak için gereklidir. Amaç, tüm ürünü ayrıntılı biçimde takip etmek değil; landing, auth, analyze, result, history ve share akışlarında dönüşümü ve düşüş noktalarını net biçimde ölçmektir.

Bu planın hedefi:
- Landing sayfasından analyze akışına geçişi ölçmek
- Kayıt ve giriş adımlarındaki düşüşü görmek
- İlk analizin başarı ve başarısızlık oranını takip etmek
- Sonuçtan history ve share davranışlarına geçişi anlamak
- Error guide sayfalarının analyze akışına katkısını ölçmek

## 2. Temel Funnel

Önerilen temel kullanıcı yolculuğu aşağıdaki event'lerle izlenmelidir:

1. `landing_view`
2. `analyze_cta_clicked`
3. `register_started`
4. `register_completed`
5. `login_completed`
6. `analyze_started`
7. `analyze_completed`
8. `analyze_failed`
9. `history_viewed`
10. `history_detail_viewed`
11. `share_link_created`
12. `share_page_viewed`
13. `share_cta_clicked`
14. `error_guide_viewed`
15. `error_guide_cta_clicked`

Bu sıralama birebir zorunlu bir tek akış anlamına gelmez. Kullanıcı bazı adımları atlayabilir. Yine de bu event'ler birlikte ürünün ana dönüşüm yüzeyini oluşturur.

## 3. Event İsimlendirme Standardı

Event isimleri için standart:
- `snake_case` kullanılmalı
- Kısa ve kalıcı olmalı
- UI metnine bağlı olmamalı
- Eylemi anlatmalı, buton rengini veya görsel tasarımı anlatmamalı

Doğru örnekler:
- `analyze_completed`
- `share_link_created`
- `error_guide_cta_clicked`

Yanlış örnekler:
- `clicked_big_purple_button`
- `home_page_primary_button_clicked`
- `magic_ai_result_generated`

## 4. Her Event İçin Önerilen Properties

Aşağıdaki property'ler önerilir. Hassas veri toplama amacıyla kullanılmamalıdır.

### `landing_view`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`  
  Değerler: `authenticated`, `anonymous`
- `referrer_type`  
  Örnek: `direct`, `search`, `share`, `error_guide`, `unknown`

### `analyze_cta_clicked`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `cta_location`  
  Örnek: `hero`, `bottom_band`, `shared_analysis`, `error_guide`

### `register_started`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `entry_point`  
  Örnek: `analyze_gate`, `public_nav`

### `register_completed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `entry_point`
- `signup_method`  
  Örnek: `email`
- `duration_ms`

### `login_completed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `login_method`  
  Örnek: `email`
- `duration_ms`

### `analyze_started`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `has_code_snippet`
- `error_category`  
  Örnek: `Type Error`, `Reference Error`, `Unknown`
- `error_length_bucket`  
  Örnek: `0-100`, `101-500`, `501+`
- `code_length_bucket`  
  Örnek: `0`, `1-500`, `501+`

### `analyze_completed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `has_analysis_id`  
  Değer: `true` / `false`
- `error_category`
- `has_code_snippet`
- `duration_ms`
- `result_type`  
  Örnek: `success`

### `analyze_failed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `error_category`
- `has_code_snippet`
- `duration_ms`
- `failure_reason`  
  Örnek: `validation_error`, `network_error`, `timeout`, `server_error`, `unknown`

### `history_viewed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `history_scope`  
  Örnek: `all`, `recent`, `search_result`

### `history_detail_viewed`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `has_analysis_id`  
  Değer: `true` / `false`
- `error_category`
- `has_share_slug`  
  Değer: `true` / `false`

### `share_link_created`
Önerilen properties:
- `page_path`
- `source_page`
- `auth_state`
- `has_analysis_id`  
  Değer: `true` / `false`
- `has_share_slug`  
  Değer: `true` / `false`
- `error_category`
- `has_code_snippet`

### `share_page_viewed`
Önerilen properties:
- `page_path`
- `source_page`
- `has_share_slug`  
  Değer: `true` / `false`
- `error_category`
- `auth_state`  
  Public sayfa olduğu için çoğunlukla `anonymous` olacaktır

Not: Public URL parçası olarak slug ölçümü gerekirse, yalnızca kişisel veya hassas içerik taşımayan genel bir URL parçası olarak değerlendirilmelidir. Güvenli varsayılan olarak `has_share_slug` tercih edilmelidir.

### `share_cta_clicked`
Önerilen properties:
- `page_path`
- `source_page`
- `has_share_slug`  
  Değer: `true` / `false`
- `auth_state`
- `cta_location`  
  Örnek: `shared_analysis_band`, `next_step_section`
- `target_path`  
  Örnek: `/analyze`, `/`

Not: Slug ölçümü gerekiyorsa bunun public URL parçası olduğu ve hassas içerik taşımaması gerektiği açıkça tanımlanmalıdır. Güvenli varsayılan olarak `has_share_slug` kullanılmalıdır.

### `error_guide_viewed`
Önerilen properties:
- `page_path`
- `source_page`
- `guide_slug`
- `error_category`
- `auth_state`

### `error_guide_cta_clicked`
Önerilen properties:
- `page_path`
- `source_page`
- `guide_slug`
- `error_category`
- `auth_state`
- `cta_location`  
  Örnek: `hero`, `bottom_band`, `prefill_button`
- `target_path`  
  Örnek: `/analyze`

## 5. İlk Etapta Ölçülmesi Gereken Minimum Event Seti

İlk reklam testi için tüm event'leri aynı anda kurmak zorunda değilsiniz. Minimum set yeterlidir.

Önerilen minimum event seti:
- `landing_view`
- `analyze_cta_clicked`
- `register_completed`
- `analyze_started`
- `analyze_completed`
- `analyze_failed`
- `share_link_created`
- `share_cta_clicked`

Bu minimum set, reklamdan gelen trafiğin ürüne dönüşüp dönüşmediğini hızlıca anlamak için yeterlidir.

## 6. Reklam Öncesi Cevaplanması Gereken Sorular

Bu plan ile ilk olarak şu sorulara cevap aranmalıdır:
- Landing’e gelenlerin kaçı analyze’a tıklıyor?
- Analyze’a gelenlerin kaçı kayıt oluyor?
- Kayıt olanların kaçı ilk analizini tamamlıyor?
- Analiz başarısızlık oranı kaç?
- Share link gerçekten yeni kullanıcı getiriyor mu?
- Error guide sayfaları analyze’a kullanıcı taşıyor mu?

Ek olarak şu sorular da takip edilebilir:
- Hangi giriş kaynağı daha fazla analyze tıklaması getiriyor?
- Kod snippet ekleyen kullanıcıların başarı oranı daha yüksek mi?
- Share sayfasından analyze’a geçiş oranı ne kadar?

## 7. Toplanmaması Gereken Veriler

Analytics event property olarak aşağıdaki veriler önerilmez:
- Hata mesajının tam metni
- Kod snippet’inin tamamı
- Email adresi
- Ad, soyad gibi kişisel bilgiler
- Kullanıcıya özel kimlik bilgileri
- Token, şifre, cookie, header gibi gizli veriler
- API yanıtının ham ve hassas içeriği

Gerekiyorsa yalnızca güvenli özetler kullanılmalıdır:
- Uzunluk bucket’ları
- Boolean alanlar
- ID/slug değerinin kendisi yerine yalnızca `has_analysis_id` / `has_share_slug` gibi boolean var/yok bilgisi
- Kategori adı gibi kişisel olmayan sınıflamalar

## 8. İleride Entegrasyon Notu

Bu plan bilinçli olarak servis bağımsız hazırlanmıştır. İleride bir analytics servisi seçildiğinde bu event isimleri ve property yapısı doğrudan uygulanabilir.

Şimdilik amaç:
- Ölçüm kapsamını netleştirmek
- Event isimlerini sabitlemek
- İlk reklam testinden önce hangi veriye ihtiyaç olduğunu belirlemek
- Fazla detaylı veya hassas veri toplamaktan kaçınmak

## 9. Kısa Özet

Fixora için analytics planı, ürünün reklamdan gelen kullanıcıyı nasıl karşıladığını ve hangi noktada dönüştürdüğünü ölçmeye odaklanmalıdır. İlk aşamada küçük bir event seti yeterlidir. Daha sonra funnel genişletilebilir, ama ilk sürümde sade ve güvenli veri toplama öncelikli olmalıdır.
