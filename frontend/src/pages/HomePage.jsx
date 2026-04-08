function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          ErrorInsight
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Konsol hatalarini daha hizli anlamlandir
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Bu proje, tarayici konsolunda gordugun Ingilizce hata mesajlarini daha anlasilir bir Turkceyle aciklamak icin gelistirildi. Basit bir analiz akisi, net sonuc ekranlari ve MongoDB gecmisi ile sunumluk ama sade bir deneyim hedefler.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Analiz</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Hata mesaji ve opsiyonel kod parcasi ile Gemini tabanli aciklama al.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Gecmis</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Basarili analizleri kaydet ve daha sonra tekrar incele.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Sunum</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Junior seviyede kalip, gercek problem cozen bir portfolio ornegi olarak kullan.
          </p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
