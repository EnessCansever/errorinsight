export const errorGuides = [
  {
    slug: 'cannot-read-properties-of-undefined-reading-map',
    title: "Cannot read properties of undefined (reading 'map')",
    category: 'Type Error',
    shortSummary: "Bir değişken beklenen anda dizi olmadığı veya tanımsız olduğu halde map() çağrıldığı için oluşur.",
    description:
      "Bu hata genellikle bir değişkenin dizi olması beklendiği halde undefined veya null olması ve üzerine map() çağrılması sonucu oluşur.",
    possibleCauses: [
      'API veya veri kaynağı beklenenden geç dönüyor.',
      'State başlangıç değeri verilmemiş veya yanlış atanmış.',
      'Asenkron veri henüz gelmeden map() çağrılıyor.',
    ],
    solutionSteps: [
      'State için başlangıç değeri olarak boş dizi [] kullanın.',
      'map() çağrısından önce Array.isArray(users) veya koşul kontrolü ekleyin.',
      'API cevaplarını try/catch ile ele alın ve loading state ekleyin.',
    ],
    brokenCode: "const names = users.map((user) => user.name)",
    fixedCode:
      "const names = Array.isArray(users) ? users.map((user) => user.name) : []",
    seoTitle: "Cannot read properties of undefined (reading 'map') — Çözümü | Fixora",
    seoDescription:
      "Bir değişken dizi değilken map() çağrıldığında oluşan hatanın olası nedenleri ve çözümleri.",
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'items-filter-is-not-a-function',
    title: 'items.filter is not a function',
    category: 'Type Error',
    shortSummary: 'items değişkeni dizi olmadığı halde filter() metodu çağrıldığı için oluşur.',
    description:
      'Genellikle items değişkeninin dizi olmadığından veya beklenen yapıda olmadığından filter() çalışmaz.',
    possibleCauses: [
      'API farklı bir obje döndürüyor.',
      'items değişkeni null veya undefined olabilir.',
    ],
    solutionSteps: [
      'items için başlangıç değeri olarak [] kullanın.',
      'filter() çağrısından önce Array.isArray(items) ile kontrol edin.',
    ],
    brokenCode: 'const visible = items.filter((i) => i.active)',
    fixedCode:
      "const visible = Array.isArray(items) ? items.filter((i) => i.active) : []",
    seoTitle: 'items.filter is not a function — Çözümü | Fixora',
    seoDescription: 'items değişkeninin dizi olmadığı durumlarda filter hatasının nedenleri ve çözüm önerileri.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'react-hydration-failed',
    title:
      'Hydration failed because the initial UI does not match what was rendered on the server',
    category: 'React Error',
    shortSummary:
      'Server tarafında üretilen HTML ile client tarafında oluşan ilk React çıktısı uyuşmadığında oluşur.',
    description:
      'Genelde server-rendered markup ile client-side render arasında tutarsızlık olduğunda bu hata görülür.',
    possibleCauses: [
      'Rastgele id/ tarih gibi değişken içeriklerin SSR sırasında farklı olması.',
      `Client-side sadece tarayıcıda kullanılan API'lerin SSR'de çalıştırılması.`,
    ],
    solutionSteps: [
      `SSR sırasında değişken içerikleri stable hale getirin (ör. deterministic id).`,
      'Only-client logic için conditional render kullanın.',
    ],
    brokenCode: '<div>{new Date().toString()}</div>',
    fixedCode: "<div>{isClient ? new Date().toString() : ''}</div>",
    seoTitle: 'Hydration failed — React Hydration Hatası | Fixora',
    seoDescription: 'React hydration hatasının yaygın nedenleri ve nasıl giderileceği hakkında kısa rehber.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'module-not-found',
    title: 'Module not found',
    category: 'Build Tool Error',
    shortSummary: 'Import edilen dosya veya paket bulunamadığında oluşur.',
    description: 'Genelde yanlış yol, eksik paket veya case-sensitive dosya isimleri bu hataya yol açar.',
    possibleCauses: [
      'Yanlış import yolu kullanıldı.',
      'Paket install edilmedi veya package.json yanlış.',
    ],
    solutionSteps: [
      'Import yolunun doğru olduğundan ve dosyanın mevcut olduğundan emin olun.',
      'node_modules yüklü ve package.json uyumlu olduğundan emin olun.',
    ],
    brokenCode: "import utils from './utils'",
    fixedCode: "import utils from './utils/index.js'",
    seoTitle: 'Module not found — Build Hatası Çözümü | Fixora',
    seoDescription: 'Module not found hatasının nedenleri ve hızlı çözüm önerileri.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'cors-policy-blocked',
    title: 'Access to fetch has been blocked by CORS policy',
    category: 'API / Network Error',
    shortSummary: `Tarayıcı, farklı origin'den gelen isteği CORS kuralları nedeniyle engellediğinde oluşur.`,
    description:
      `Sunucu CORS başlıklarını doğru şekilde dönmüyorsa tarayıcı isteği engeller; özellikle fetch ve XHR istekleri bu hatayı tetikler.`,
    possibleCauses: [
      'Backend CORS yapılandırması izin vermiyor.',
      `Preflight (OPTIONS) isteği başarısız oluyor.`,
    ],
    solutionSteps: [
      `Backend tarafında Access-Control-Allow-Origin header ekleyin veya doğru origin izin verin.`,
      `Preflight cevabının gerekli header'ları içerdiğinden emin olun.`,
    ],
    brokenCode: "fetch('https://api.other.com/data')",
    fixedCode: "fetch('/api/proxy/data') // same-origin proxy veya server-side CORS yapılandırması",
    seoTitle: 'CORS policy blocked — Tarayıcı CORS Hatası | Fixora',
    seoDescription: 'CORS policy hatasının olası nedenleri ve kısa çözüm önerileri.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'referenceerror-is-not-defined',
    title: 'ReferenceError: is not defined',
    category: 'Reference Error',
    shortSummary: 'Tanımlanmamış bir değişken veya fonksiyon kullanılmaya çalışıldığında oluşur.',
    description:
      'Bu hata genellikle bir değişkenin, fonksiyonun veya import edilen değerin tanımlanmadan önce kullanılması sonucu ortaya çıkar.',
    possibleCauses: [
      `Değişken veya fonksiyon hiç tanımlanmamış olabilir.`,
      'Değişken yanlış scope içinde tanımlanmış olabilir.',
      `Import/export adı hatalı yazılmış olabilir.`,
    ],
    solutionSteps: [
      `Hata mesajında geçen değişken veya fonksiyon adını kontrol edin.`,
      `Değişkenin kullanıldığı yerde erişilebilir scope içinde olduğundan emin olun.`,
      `Import/export isimlerini ve dosya yollarını kontrol edin.`,
    ],
    brokenCode: "console.log(userName)",
    fixedCode: "const userName = 'Enes'\nconsole.log(userName)",
    seoTitle: 'ReferenceError is not defined — Çözümü | Fixora',
    seoDescription: 'ReferenceError is not defined hatasının nedenleri, scope kontrolü ve hızlı çözüm adımları.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'syntaxerror-unexpected-token',
    title: 'SyntaxError: Unexpected token',
    category: 'Syntax Error',
    shortSummary: 'JavaScript kodunda beklenmeyen veya hatalı yazılmış bir karakter/sözdizimi olduğunda oluşur.',
    description:
      'Bu hata genellikle eksik parantez, yanlış virgül, hatalı tırnak kullanımı veya bozuk JavaScript sözdizimi nedeniyle ortaya çıkar.',
    possibleCauses: [
      `Parantez, süslü parantez veya köşeli parantez eksik olabilir.`,
      `String tırnakları kapanmamış olabilir.`,
      `Yanlış yerde virgül, noktalı virgül veya özel karakter kullanılmış olabilir.`,
    ],
    solutionSteps: [
      `Hata mesajında belirtilen satırı ve bir önceki satırı kontrol edin.`,
      `Parantez, tırnak ve virgül kullanımını gözden geçirin.`,
      `Kod formatlayıcı veya linter kullanarak sözdizimi hatasını görünür hale getirin.`,
    ],
    brokenCode: "const user = { name: 'Enes', age: 26,",
    fixedCode: "const user = { name: 'Enes', age: 26 }",
    seoTitle: 'SyntaxError Unexpected token — Çözümü | Fixora',
    seoDescription: 'SyntaxError Unexpected token hatasının yaygın nedenleri ve JavaScript sözdizimi çözüm adımları.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
]

export default errorGuides
