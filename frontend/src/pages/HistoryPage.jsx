import { useEffect, useState } from 'react'
import { getHistoryDetail, getHistoryList } from '../services/historyApi'

function formatDate(value) {
  try {
    return new Date(value).toLocaleString('tr-TR')
  } catch (error) {
    return value
  }
}

function HistoryPage() {
  const [historyItems, setHistoryItems] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [isListLoading, setIsListLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    async function fetchHistory() {
      setIsListLoading(true)
      setErrorText('')

      try {
        const data = await getHistoryList()
        setHistoryItems(data)

        if (data.length > 0) {
          setSelectedId(data[0]._id)
        }
      } catch (error) {
        setErrorText(error.message)
      } finally {
        setIsListLoading(false)
      }
    }

    fetchHistory()
  }, [])

  useEffect(() => {
    async function fetchDetail() {
      if (!selectedId) {
        setSelectedDetail(null)
        return
      }

      setIsDetailLoading(true)
      setErrorText('')

      try {
        const detail = await getHistoryDetail(selectedId)
        setSelectedDetail(detail)
      } catch (error) {
        setErrorText(error.message)
      } finally {
        setIsDetailLoading(false)
      }
    }

    fetchDetail()
  }, [selectedId])

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold">Analiz Gecmisi</h2>
        <p className="mt-1 text-sm text-slate-600">
          Son analizleri listeden secerek detaylarini gorebilirsin.
        </p>
      </header>

      {errorText && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorText}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Son Analizler</h3>

          {isListLoading && (
            <p className="mt-3 text-sm text-slate-600">Gecmis yukleniyor...</p>
          )}

          {!isListLoading && historyItems.length === 0 && (
            <p className="mt-3 text-sm text-slate-600">Henuz kayitli analiz bulunmuyor.</p>
          )}

          {!isListLoading && historyItems.length > 0 && (
            <ul className="mt-3 space-y-2">
              {historyItems.map((item) => {
                const isActive = selectedId === item._id

                return (
                  <li key={item._id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(item._id)}
                      className={`w-full rounded-lg border px-3 py-3 text-left transition ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        {item.category}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-medium">
                        {item.errorMessage}
                      </p>
                      <p className="mt-1 text-xs opacity-70">{formatDate(item.createdAt)}</p>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Detay</h3>

          {isDetailLoading && (
            <p className="mt-3 text-sm text-slate-600">Detay yukleniyor...</p>
          )}

          {!isDetailLoading && !selectedDetail && (
            <p className="mt-3 text-sm text-slate-600">Detay gormek icin listeden bir kayit sec.</p>
          )}

          {!isDetailLoading && selectedDetail && (
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Kategori</p>
                <p className="text-slate-700">{selectedDetail.category}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Kisa Ozet</p>
                <p className="text-slate-700">{selectedDetail.shortSummary}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Hata Mesaji</p>
                <p className="text-slate-700">{selectedDetail.errorMessage}</p>
              </div>

              {selectedDetail.codeSnippet && (
                <div>
                  <p className="font-semibold text-slate-900">Kod Parcasi</p>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">
                    <code>{selectedDetail.codeSnippet}</code>
                  </pre>
                </div>
              )}

              <div>
                <p className="font-semibold text-slate-900">Olusturma Zamani</p>
                <p className="text-slate-700">{formatDate(selectedDetail.createdAt)}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default HistoryPage
