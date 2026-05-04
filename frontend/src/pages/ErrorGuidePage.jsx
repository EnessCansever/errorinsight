import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { usePageMeta } from '../hooks/usePageMeta'
import errorGuides from '../data/errorGuides'

function ErrorGuidePage() {
  const { slug } = useParams()

  const guide = useMemo(() => errorGuides.find((g) => g.slug === String(slug || '').trim()), [slug])

  const relatedGuides = useMemo(() => {
    if (!guide) return []

    return [...errorGuides]
      .filter((g) => g.slug !== guide.slug)
      .sort((a, b) => {
        const aSameCategory = a.category === guide.category
        const bSameCategory = b.category === guide.category

        if (aSameCategory && !bSameCategory) return -1
        if (!aSameCategory && bSameCategory) return 1

        return 0
      })
      .slice(0, 3)
  }, [guide])

  usePageMeta(
    guide
      ? {
          title: guide.seoTitle || guide.title,
          description: guide.seoDescription || guide.shortSummary,
          robots: 'index, follow',
        }
      : { title: 'Hata rehberi bulunamadı', robots: 'noindex, nofollow' },
  )

  const handlePrefill = () => {
    if (!guide) return

    try {
      sessionStorage.setItem(
        'fixora_analyze_prefill',
        JSON.stringify({ errorMessage: guide.title, codeSnippet: guide.brokenCode || '' }),
      )
    } catch {
      // ignore
    }
  }

  if (!guide) {
    return (
      <section className="mx-auto w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold">Hata rehberi bulunamadı</h1>
        <p className="text-sm text-slate-600">Aradığınız rehber mevcut değil veya yanlış bağlantı kullandınız.</p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6366F1]">Hata Rehberi</p>
        <h1 className="text-2xl font-bold wrap-break-word text-slate-900 sm:text-3xl dark:text-slate-100">{guide.title}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">{guide.shortSummary}</p>
      </header>

      <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kategori</p>
            <span className="mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
              {guide.category}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Ayrıntılar</h3>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{guide.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Muhtemel Nedenler</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
              {guide.possibleCauses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Çözüm Adımları</h3>
            <ol className="mt-2 space-y-2 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300">
              {guide.solutionSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          {guide.brokenCode && (
            <div>
              <h3 className="text-sm font-semibold">Kırılan Kod</h3>
              <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 p-3 text-xs text-slate-100">
                <pre className="whitespace-pre-wrap">{guide.brokenCode}</pre>
              </div>
            </div>
          )}

          {guide.fixedCode && (
            <div>
              <h3 className="text-sm font-semibold">Örnek Düzeltilmiş Kod</h3>
              <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200 bg-white dark:bg-slate-900">
                <div className="min-w-0 dark:hidden">
                  <SyntaxHighlighter language="javascript" style={oneLight} customStyle={{ margin: 0, padding: '12px', fontSize: '11px' }} showLineNumbers>
                    {guide.fixedCode}
                  </SyntaxHighlighter>
                </div>
                <div className="hidden min-w-0 dark:block">
                  <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ margin: 0, padding: '12px', fontSize: '11px' }} showLineNumbers>
                    {guide.fixedCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              to="/analyze"
              onClick={handlePrefill}
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white"
            >
              Bu örneği forma doldur
            </Link>

            <Link
              to="/analyze"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Kendi hatanı analiz et
            </Link>
          </div>
        </div>
      </article>

      {relatedGuides.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Benzer hata rehberleri</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((related) => (
              <Link
                key={related.slug}
                to={`/errors/${related.slug}`}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 transition hover:border-[#6366F1]/35 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/25"
                aria-label={`${related.title} rehberi`}
              >
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                    {related.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 wrap-break-word">
                    {related.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {related.shortSummary}
                  </p>
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-[#6366F1]">Rehberi incele →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

export default ErrorGuidePage
