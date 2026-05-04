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
      'Client-side sadece tarayıcıda kullanılan API\'lerin SSR\'de çalıştırılması.',
    ],
    solutionSteps: [
      'SSR sırasında değişken içerikleri stable hale getirin (ör. deterministic id).',
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
    shortSummary: 'Tarayıcı, farklı origin\'den gelen isteği CORS kuralları nedeniyle engellediğinde oluşur.',
    description:
      'Sunucu CORS başlıklarını doğru şekilde dönmüyorsa tarayıcı isteği engeller; özellikle fetch ve XHR istekleri bu hatayı tetikler.',
    possibleCauses: [
      'Backend CORS yapılandırması izin vermiyor.',
      'Preflight (OPTIONS) isteği başarısız oluyor.',
    ],
    solutionSteps: [
      'Backend tarafında Access-Control-Allow-Origin header ekleyin veya doğru origin izin verin.',
      'Preflight cevabının gerekli header\'ları içerdiğinden emin olun.',
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
      'Değişken veya fonksiyon hiç tanımlanmamış olabilir.',
      'Değişken yanlış scope içinde tanımlanmış olabilir.',
      'Import/export adı hatalı yazılmış olabilir.',
    ],
    solutionSteps: [
      'Hata mesajında geçen değişken veya fonksiyon adını kontrol edin.',
      'Değişkenin kullanıldığı yerde erişilebilir scope içinde olduğundan emin olun.',
      'Import/export isimlerini ve dosya yollarını kontrol edin.',
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
      'Parantez, süslü parantez veya köşeli parantez eksik olabilir.',
      'String tırnakları kapanmamış olabilir.',
      'Yanlış yerde virgül, noktalı virgül veya özel karakter kullanılmış olabilir.',
    ],
    solutionSteps: [
      'Hata mesajında belirtilen satırı ve bir önceki satırı kontrol edin.',
      'Parantez, tırnak ve virgül kullanımını gözden geçirin.',
      'Kod formatlayıcı veya linter kullanarak sözdizimi hatasını görünür hale getirin.',
    ],
    brokenCode: "const user = { name: 'Enes', age: 26,",
    fixedCode: "const user = { name: 'Enes', age: 26 }",
    seoTitle: 'SyntaxError Unexpected token — Çözümü | Fixora',
    seoDescription: 'SyntaxError Unexpected token hatasının yaygın nedenleri ve JavaScript sözdizimi çözüm adımları.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'cannot-read-properties-of-null',
    title: 'Cannot read properties of null',
    category: 'Type Error',
    shortSummary: 'Null değerine sahip bir değişken üzerinde metod veya özellik erişilmeye çalışıldığında oluşur.',
    description:
      'Bu hata genellikle bir değişkenin null olması ve üzerine özellik erişimi veya metod çağrısı yapılması sonucu oluşur. Undefined hatası gibi, null üzerinde işlem yapılamaz.',
    possibleCauses: [
      'Bir fonksiyon açıkça null döndürebilir.',
      'API yanıtı beklenen nesne yerine null dönmüş olabilir.',
      'DOM element querySelector ile bulunamadığında null döner.',
      'Optional chaining kullanılmamış olabilir.',
    ],
    solutionSteps: [
      'Kullanımdan önce null kontrolü ekleyin: if (value !== null) {...}',
      'Optional chaining operatörü kullanın: value?.property',
      'Nullish coalescing operatörü ile fallback değer sağlayın: value ?? defaultValue',
    ],
    brokenCode: 'const user = null\nconsole.log(user.name)',
    fixedCode: 'const user = null\nconsole.log(user?.name ?? "Bilinmiyor")',
    seoTitle: 'Cannot read properties of null — Çözümü | Fixora',
    seoDescription: 'Null değerine özellik erişiminde oluşan hatanın nedenleri ve optional chaining ile çözümü.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'usestate-is-not-defined',
    title: 'useState is not defined',
    category: 'React Error',
    shortSummary: 'useState Hook tanımlanmadan veya yanlış şekilde kullanıldığında oluşur.',
    description:
      'Bu hata genellikle useState Hook\'ı React module\'ından import edilmemesi veya yanlış scopo kullanıldığında görülür. useState sadece React bileşenleri içinde ve component body\'sinin tepesinde çağrılmalıdır.',
    possibleCauses: [
      'useState React içinden import edilmemiş olabilir.',
      'useState custom Hook içinde değil, normal fonksiyon içinde çağrılmış olabilir.',
      'useState condition veya loop içinde çağrılmış olabilir.',
    ],
    solutionSteps: [
      'useState Hook\'ını React\'ten import edin: import { useState } from "react"',
      'useState\'i React component body\'sinin tepesinde (conditionals dışında) çağırın.',
      'useState sadece React component veya custom Hook içinde kullanılabilir.',
    ],
    brokenCode: 'function Component() {\n  if (true) useState(0)\n}',
    fixedCode: 'import { useState } from "react"\n\nfunction Component() {\n  const [count, setCount] = useState(0)\n}',
    seoTitle: 'useState is not defined — React Hook Hatası | Fixora',
    seoDescription: 'React useState Hook tanım hatasının nedenleri, import ve Rules of Hooks çözümleri.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'objects-are-not-valid-as-a-react-child',
    title: 'Objects are not valid as a React child',
    category: 'React Error',
    shortSummary: 'React render etme sırasında bir JavaScript nesne doğrudan JSX içine yazıldığında oluşur.',
    description:
      'React, primitive tipler (string, number, boolean) veya React element render edebilir ama sıradan JavaScript nesneleri render edemez. Genellikle nesneyi string\'e dönüştürme veya yapı çıkarmak gerekir.',
    possibleCauses: [
      'API yanıtında gelen nesne doğrudan JSX içine yazılmış olabilir.',
      'State\'de bir nesne tutulup doğrudan render edilmeye çalışılmış olabilir.',
      'Array.map içinde tam nesne yerine sadece değer kullanılmamış olabilir.',
    ],
    solutionSteps: [
      'Nesneyi JSON.stringify kullanarak string\'e çevirin veya Object.keys/Object.entries ile parçalayın.',
      'Nesnenin özellikleri varsa, bunları ayrı ayrı render edin: {obj.name}, {obj.value}',
      'Array.map içinde nesne yerine primitive değerleri return edin.',
    ],
    brokenCode: 'function App() {\n  const user = { name: "Enes", age: 26 }\n  return <div>{user}</div>\n}',
    fixedCode: 'function App() {\n  const user = { name: "Enes", age: 26 }\n  return <div>{user.name}, {user.age}</div>\n}',
    seoTitle: 'Objects are not valid as React child — Çözümü | Fixora',
    seoDescription: 'React render hatasında JavaScript nesne çıkarmadan veya dönüştürmeden yapılabilecek işlemler.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'failed-to-fetch',
    title: 'Failed to fetch',
    category: 'API / Network Error',
    shortSummary: 'Ağ isteği başarısız olduğunda, CORS engeli olduğunda veya sunucu erişilemediğinde oluşur.',
    description:
      'Bu hata fetch() veya XHR istekleri sırasında ağ bağlantısı koptuğunda, tarayıcı politikaları tarafından engellendiğinde veya sunucu yanıt vermediğinde görülür. Genellikle Development ortamından Production ortamına geçerken CORS problemi olarak da görülür.',
    possibleCauses: [
      'İnternet bağlantısı kesilmiş veya sunucu erişilemez durumda.',
      'CORS policy tarafından isteği engellenmiş olabilir.',
      'Fetch request wrong URL veya protocol kullanıyor olabilir.',
      'Browser sandbox modundan dolayı local file protokolü çalışmayabiliyor.',
    ],
    solutionSteps: [
      'Network tab\'ında istek ve cevapı kontrol edin; status code 0 ise genellikle CORS veya ağ hatasıdır.',
      'Backend CORS headers\'ını doğru ayarlayın veya same-origin proxy kullanın.',
      'Try/catch ile hataları yakalayın ve kullanıcıya retry imkanı sunun.',
      'Development ve production URL\'lerinin tutarlı olduğundan emin olun.',
    ],
    brokenCode: 'fetch("https://api.example.com/data")\n  .then(r => r.json())',
    fixedCode: 'fetch("https://api.example.com/data")\n  .then(r => r.json())\n  .catch(e => console.error("Fetch failed:", e))',
    seoTitle: 'Failed to fetch — Network Hatası Çözümü | Fixora',
    seoDescription: 'Failed to fetch hatasının nedenleri, CORS çözümü ve ağ isteklerinde error handling.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
  {
    slug: 'unexpected-end-of-json-input',
    title: 'Unexpected end of JSON input',
    category: 'Syntax Error',
    shortSummary: 'JSON.parse() yaparsanız geçersiz veya tamamlanmamış JSON string\'i geçirildiğinde oluşur.',
    description:
      'Bu hata API yanıtını parse etmeye çalışırken, yanıtın aslında boş string, geçersiz JSON veya kısmi yanıt olması sonucu ortaya çıkar. Genellikle network hataları veya server yanıt problemi nedeniyle görülür.',
    possibleCauses: [
      'Server HTML error sayfası döndürüp JSON döndürmedi (Status 500 vb).',
      'Response boş veya null olabilir.',
      'JSON string\'i eksik veya bozuk formatında olabilir.',
      'Encoding problemi nedeniyle JSON bozulmuş olabilir.',
    ],
    solutionSteps: [
      'r.text() ile önce response text\'ini kontrol edin ve console\'da yazdırın.',
      'r.ok && r.status === 200 kontrolü yaparak status code kontrol edin.',
      'Try/catch içinde JSON.parse işlemini yapın ve error handle edin.',
      'Content-Type header\'ının application/json olduğundan emin olun.',
    ],
    brokenCode: 'fetch("/api/data").then(r => r.json()).catch(e => {})',
    fixedCode: 'fetch("/api/data").then(r => {\n  if (!r.ok) throw new Error("Response not ok")\n  return r.json()\n}).catch(e => console.error("Parse error:", e))',
    seoTitle: 'Unexpected end of JSON input — JSON Parse Hatası | Fixora',
    seoDescription: 'JSON parse hatasının nedenleri, yanıt kontrolü ve error handling stratejileri.',
    lastModified: '2026-05-03T00:00:00.000Z',
  },
]

export default errorGuides

