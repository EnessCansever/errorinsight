const { categorizeError } = require('../utils/categorizer')

// Mock veri haritası - sonradan Gemini API ile değiştirilecek
const mockResponses = {
  'Reference Error': {
    shortSummary: 'Bir değişken veya fonksiyon tanımlanmamış.',
    turkishExplanation:
      'Kullandığınız bir değişken veya fonksiyon kodu çalıştırılmadan önce tanımlanmamış. JavaScript bu değişkeni bulamıyor.',
    possibleCauses: [
      'Değişken adı yanlış yazıldı.',
      'Değişken bir scope dışında tanımlandı.',
      'Import/require ifadesi eksik veya yanlış.',
    ],
    solutionSteps: [
      'Değişken adının yazımını kontrol edin.',
      'Değişkenin tanımlandığı yerin scope\'una bakın.',
      'Gerekli library veya modülü import ettiğinizden emin olun.',
    ],
    exampleFixCode: `// ❌ Hatalı
console.log(userName)

// ✅ Doğru
const userName = 'John'
console.log(userName)`,
    notes: 'Değişkeni kullanmadan önce tanımlayın.',
  },
  'Syntax Error': {
    shortSummary: 'Kod yazımında bir hata var.',
    turkishExplanation:
      'JavaScript köşeli parantez, virgül, semikol veya diğer yazım kurallarında bir sorun bulmuş. Kod geçersiz.',
    possibleCauses: [
      'Kapalı olmayan parantez veya tırnak işareti.',
      'Eksik virgül veya semikol.',
      'Yanlış operatör kullanımı.',
    ],
    solutionSteps: [
      'Tüm parantezlerin açılıp kapanmış olduğunu kontrol edin.',
      'String ve objelerdeki tırnak işaretlerini kontrol edin.',
      'Hata satırı civarındaki kodu dikkatle inceleyin.',
    ],
    exampleFixCode: `// ❌ Hatalı
const obj = { name: "John }

// ✅ Doğru
const obj = { name: "John" }`,
    notes: 'Syntax hataları kod çalıştırılmadan hemen görülür.',
  },
  'Type Error': {
    shortSummary: 'Veri tipi uyuşmazlığı veya geçersiz işlem.',
    turkishExplanation:
      'Bir fonksiyon gibi işlemleri null, undefined veya yanlış türde bir değere uygulamaya çalıştınız.',
    possibleCauses: [
      'null veya undefined değere bir metod çağrıldı.',
      'Bir sayı yerine string üzerinde matematiksel işlem yapıldı.',
      'Dizi yerine string üzerinde dizi metodu kullanıldı.',
    ],
    solutionSteps: [
      'Kullandığınız değerin türünü kontrol edin (typeof).',
      'null/undefined kontrolleri ekleyin.',
      'Tür dönüşümü (type casting) yapın gerekirse.',
    ],
    exampleFixCode: `// ❌ Hatalı
const user = null
user.getName()

// ✅ Doğru
const user = { getName: () => 'John' }
user.getName()`,
    notes: 'Type hataları çoğunlukla runtime\'da oluşur.',
  },
  'React Error': {
    shortSummary: 'React kullanımında bir sorun var.',
    turkishExplanation:
      'Hook kuralları ihlal edilmiş, bileşen hatalı render edilmiş veya React-spesifik bir sorun meydana gelmiş.',
    possibleCauses: [
      'Hook\'lar koşullu olarak kullanıldı.',
      'Hook\'lar bileşen dışından çağrıldı.',
      'Key prop\'u düzgün set edilmedi.',
    ],
    solutionSteps: [
      'Hook\'ların her zaman bileşen üst seviyesinde çağrıldığından emin olun.',
      'useState/useEffect\'i koşulun dışına çıkartın.',
      'Listelerde unique key prop\'u ekleyin.',
    ],
    exampleFixCode: `// ❌ Hatalı
const MyComponent = () => {
  if (condition) {
    const [state, setState] = useState(0)
  }
}

// ✅ Doğru
const MyComponent = () => {
  const [state, setState] = useState(0)
}`,
    notes: 'React kurallarına uygun kod yazın.',
  },
  'API / Network Error': {
    shortSummary: 'Sunucuya bağlantı kurulamadı veya istekte bir sorun var.',
    turkishExplanation:
      'CORS hatası, ağ problemi, yanlış URL veya sunucu hatası nedeniyle API çağrısı başarısız olmuş.',
    possibleCauses: [
      'URL yanlış veya sunucu aşağıda.',
      'CORS politikası izin vermiyor.',
      'Internet bağlantısı yok.',
      'Sunucu 4xx veya 5xx hatası dönüyor.',
    ],
    solutionSteps: [
      'URL\'yi kontrol edin ve sunucunun çalışıp çalışmadığını test edin.',
      'Backend\'de CORS ayarlarını kontrol edin.',
      'Network sekmesinde isteğin detaylarına bakın.',
      'Sunucu loglarını inceleyin.',
    ],
    exampleFixCode: `// Backend CORS ayarı
const cors = require('cors')
app.use(cors())

// Frontend
fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error('API Error:', err))`,
    notes: 'Network istek başarısızlıklarını düzgün ele alın.',
  },
  'Build Tool Error': {
    shortSummary: 'Proje build sırasında bir hata oluştu.',
    turkishExplanation:
      'Webpack, Vite, Babel veya başka bir build tool\'u kod derlemeye çalışırken bir sorunla karşılaştı.',
    possibleCauses: [
      'Loader veya plugin konfigürasyonu yanlış.',
      'Module bulunamıyor.',
      'Syntax hatası derleme sırasında yakalandı.',
    ],
    solutionSteps: [
      'Build tool config dosyasını kontrol edin.',
      'node_modules ve lock dosyalarını temizleyin (npm ci).',
      'npm/yarn cache temizleyin.',
    ],
    exampleFixCode: `// Vite config
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
    notes: 'Build hataları proje konfigürasyonundan kaynaklanır.',
  },
  Unknown: {
    shortSummary: 'Hata mesajı tanınamadı.',
    turkishExplanation:
      'Bu hata kategorisi sistem tarafından tanınamadı. Lütfen hata mesajını daha detaylı kontrol edin veya dokümantasyona başvurun.',
    possibleCauses: [
      'Nadir veya özel bir hata.',
      'Hata mesajı tam olmayabilir.',
    ],
    solutionSteps: [
      'Hata stack trace\'ini tam olarak okuyun.',
      'İlgili kütüphanenin dokümantasyonunu kontrol edin.',
      'Hata mesajıyla birlikte net bir örnek bulunuz.',
    ],
    exampleFixCode: 'Belirli hata türünü belirlemek için daha fazla bilgi gerekli.',
    notes: 'Hata dosyalı version olarak raporlayın.',
  },
}

// Mock analiz fonksiyonu - sonradan Gemini API ile değiştirilecek
const analyzeError = (errorMessage, codeSnippet = null) => {
  const category = categorizeError(errorMessage)
  const mockResponse = mockResponses[category] || mockResponses.Unknown

  return {
    inputError: errorMessage.substring(0, 100), // İlk 100 karakter
    category,
    shortSummary: mockResponse.shortSummary,
    turkishExplanation: mockResponse.turkishExplanation,
    possibleCauses: mockResponse.possibleCauses,
    solutionSteps: mockResponse.solutionSteps,
    exampleFixCode: mockResponse.exampleFixCode,
    notes: mockResponse.notes,
    codeProvided: codeSnippet !== null,
    timestamp: new Date().toISOString(),
  }
}

module.exports = {
  analyzeError,
}
