import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPublicSharedHistory } from '../services/historyApi'

const categoryLabels = {
  'Type Error': 'Tip Hatası',
  'Reference Error': 'Referans Hatası',
  'Syntax Error': 'Sözdizimi Hatası',
  'React Error': 'React Hatası',
  'API / Network Error': 'API / Ağ Hatası',
  'Build Tool Error': 'Build Aracı Hatası',
  Unknown: 'Bilinmeyen',
}

function getCategoryLabel(category) {
  return categoryLabels[category] || category
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleString('tr-TR')
  } catch {
    return value
  }
}

function SharedAnalysisPage() {
  const { slug } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchSharedAnalysis() {
      const normalizedSlug = String(slug || '').trim()

      if (!normalizedSlug) {
        setErrorText('Paylaşım bağlantısı geçersiz.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorText('')

      try {
        const data = await getPublicSharedHistory(normalizedSlug)

        if (cancelled) {
          return
        }

        setAnalysis(data)
      } catch (error) {
        if (cancelled) {
          return
        }

        setAnalysis(null)
        setErrorText(error?.message || 'Paylaşılan analiz alınamadı.')
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchSharedAnalysis()

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <section className="mx-auto w-full max-w-3xl space-y-5 sm:space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6366F1]">Paylaşılan Analiz</p>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Fixora Analiz Sonucu</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Bu sayfa, paylaşıma açılmış tek bir analiz kaydını gösterir.</p>
      </header>

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Paylaşılan analiz yükleniyor...
        </div>
      )}

      {!isLoading && errorText && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <p className="text-sm font-semibold text-red-900 dark:text-red-300">Paylaşılan analiz görüntülenemedi</p>
          <p className="mt-1 text-sm text-red-800 dark:text-red-200">{errorText}</p>
          <Link
            to="/"
            className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      )}

      {!isLoading && !errorText && analysis && (
        <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Kategori</p>
              <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{getCategoryLabel(analysis.category)}</p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-4 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Kısa Özet</p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{analysis.shortSummary}</p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-4 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Hata Mesajı</p>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{analysis.errorMessage}</p>
            </div>

            {analysis.codeSnippet && (
              <div className="rounded-xl bg-slate-50 px-4 py-4 dark:bg-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Kod Parçası</p>
                <pre className="mt-2 max-w-full overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100 dark:bg-slate-950">
                  <code>{analysis.codeSnippet}</code>
                </pre>
              </div>
            )}

            <div className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Paylaşım Tarihi</p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{formatDate(analysis.createdAt)}</p>
            </div>
          </div>
        </article>
      )}
    </section>
  )
}

export default SharedAnalysisPage
