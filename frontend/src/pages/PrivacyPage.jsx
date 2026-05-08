import { usePageMeta } from '../hooks/usePageMeta'

function PrivacyPage() {
  usePageMeta({
    title: 'Fixora - Gizlilik Politikası',
    description: 'Fixora gizlilik politikası: verilerin hangi amaçlarla kullanıldığını sade bir dille açıklar.',
    robots: 'index, follow',
  })

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6366F1]">Fixora</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Gizlilik Politikası</h1>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          Fixora, hata mesajlarını daha anlaşılır hale getirmek için geliştirilen erken aşama bir hata analizi aracıdır.
        </p>
      </header>

      <article className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">1. Hangi veriler işlenir?</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li>Hata mesajı</li>
            <li>İsteğe bağlı kod parçası</li>
            <li>Analiz sonucu</li>
            <li>Hesap bilgileri</li>
            <li>Paylaşım linki oluşturulursa public analiz bağlantısı</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">2. Veriler ne için kullanılır?</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
            <li>Hata analizi oluşturmak</li>
            <li>Analiz geçmişini göstermek</li>
            <li>Kullanıcının kendi analizlerine tekrar erişmesini sağlamak</li>
            <li>Paylaşım linki oluşturulduysa public share sayfası göstermek</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">3. Hassas veri uyarısı</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            Şifre, token, API key, kişisel bilgi veya gizli şirket kodu gibi hassas verileri platforma eklememenizi öneririz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">4. Paylaşım linkleri</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            Bir analizi paylaştığınızda, bu bağlantıya sahip kişiler ilgili analizi görüntüleyebilir. Paylaşmadan önce içeriği kontrol etmeniz önemlidir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">5. Analytics notu</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            Ürünü geliştirmek için sayfa görüntüleme ve temel kullanım metrikleri ölçülebilir. Hata mesajının tam metni veya kod snippet'inin tam içeriği analytics event olarak gönderilmemelidir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">6. İletişim</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">Şimdilik LinkedIn üzerinden iletişim kurulabilir:</p>
          <a
            href="https://www.linkedin.com/in/enes-cansever-478766244/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-sm text-sm font-medium text-[#6366F1] transition-colors hover:text-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 dark:text-indigo-300 dark:hover:text-indigo-200"
          >
            LinkedIn üzerinden iletişime geç
          </a>
        </section>
      </article>
    </section>
  )
}

export default PrivacyPage
