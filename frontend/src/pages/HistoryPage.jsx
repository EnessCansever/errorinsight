import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createHistoryShareLink, deleteHistory, getHistoryDetail, getHistoryList } from '../services/historyApi'

const HISTORY_PAGE_LIMIT = 8
const SEARCH_DEBOUNCE_MS = 300
const SEARCH_MAX_LENGTH = 120

async function copyTextToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const helperTextArea = document.createElement('textarea')
  helperTextArea.value = value
  helperTextArea.setAttribute('readonly', '')
  helperTextArea.style.position = 'absolute'
  helperTextArea.style.left = '-9999px'
  document.body.appendChild(helperTextArea)
  helperTextArea.select()
  document.execCommand('copy')
  document.body.removeChild(helperTextArea)
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleString('tr-TR')
  } catch {
    return value
  }
}

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

const categoryOptions = [
  { value: '', label: 'Tüm Kategoriler' },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
]

function HistoryPage() {
  const { isAuthenticated } = useAuth()
  const [historyItems, setHistoryItems] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [isListLoading, setIsListLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [sharingId, setSharingId] = useState('')
  const [listError, setListError] = useState('')
  const [detailError, setDetailError] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: HISTORY_PAGE_LIMIT,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  })

  const selectedIdRef = useRef('')
  const skipNextFetchRef = useRef(null)

  useEffect(() => {
    selectedIdRef.current = selectedId
  }, [selectedId])

  // Merkezi state temizleme helper: auth düşüşü veya unauthorized geçişinde
  const resetHistoryState = useCallback(() => {
    setHistoryItems([])
    setSelectedId('')
    setSelectedDetail(null)
    setListError('')
    setDetailError('')
    setIsListLoading(false)
    setIsDetailLoading(false)
    setDeletingId('')
    setSharingId('')
    setSearchInput('')
    setAppliedSearch('')
    setSelectedCategory('')
    setSortOrder('newest')
    setPage(1)
    setPagination({
      page: 1,
      limit: HISTORY_PAGE_LIMIT,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    })
  }, [])

  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) {
      resetHistoryState()
      return
    }

    if (skipNextFetchRef.current === page) {
      skipNextFetchRef.current = null
      return
    }

    setIsListLoading(true)
    setListError('')

    try {
      const response = await getHistoryList({
        page,
        limit: HISTORY_PAGE_LIMIT,
        search: appliedSearch,
        category: selectedCategory,
        sort: sortOrder,
      })

      const items = response?.items || []
      const nextPagination = response?.pagination || {
        page,
        limit: HISTORY_PAGE_LIMIT,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }

      setDetailError('')
      setHistoryItems(items)
      setPagination(nextPagination)

      if (nextPagination.page !== page) {
        skipNextFetchRef.current = nextPagination.page
        setPage(nextPagination.page)
      }

      if (items.length === 0) {
        setSelectedId('')
        setSelectedDetail(null)
        return
      }

      const currentSelectedId = selectedIdRef.current
      const hasPreviousSelection = items.some((item) => item._id === currentSelectedId)
      const nextSelectedId = hasPreviousSelection ? currentSelectedId : items[0]._id

      if (nextSelectedId !== currentSelectedId) {
        setSelectedDetail(null)
      }

      setSelectedId(nextSelectedId)
    } catch (error) {
      const message = error?.message || 'Geçmiş kayıtları alınamadı.'
      setListError(message)
      setHistoryItems([])
      setSelectedId('')
      setSelectedDetail(null)
    } finally {
      setIsListLoading(false)
    }
  }, [isAuthenticated, resetHistoryState, page, appliedSearch, selectedCategory, sortOrder])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setAppliedSearch(searchInput.trim())
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchInput])

  // Auth düşüşünde sayfanın tüm state'i temizle (stale content gösterilmesin)
  useEffect(() => {
    if (isAuthenticated) {
      return
    }

    resetHistoryState()
  }, [isAuthenticated, resetHistoryState])

  useEffect(() => {
    let isCancelled = false

    async function fetchDetail() {
      if (!isAuthenticated || !selectedId) {
        setSelectedDetail(null)
        setDetailError('')
        setIsDetailLoading(false)
        return
      }

      setIsDetailLoading(true)
      setDetailError('')

      try {
        const detail = await getHistoryDetail(selectedId)
        if (isCancelled) {
          return
        }
        setSelectedDetail(detail)
      } catch (error) {
        if (isCancelled) {
          return
        }
        setSelectedDetail(null)
        setDetailError(error?.message || 'Kayıt detayı alınamadı.')
      } finally {
        if (!isCancelled) {
          setIsDetailLoading(false)
        }
      }
    }

    fetchDetail()

    return () => {
      isCancelled = true
    }
  }, [isAuthenticated, selectedId])

  const hasActiveFilters =
    searchInput.trim().length > 0 || selectedCategory.length > 0 || sortOrder !== 'newest'

  const isFilteredEmpty = !isListLoading && pagination.totalItems === 0 && hasActiveFilters
  const isInitialEmpty = !isListLoading && pagination.totalItems === 0 && !hasActiveFilters

  const clearFilters = () => {
    setSearchInput('')
    setAppliedSearch('')
    setSelectedCategory('')
    setSortOrder('newest')
    setPage(1)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    setPage(1)
  }

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
    setPage(1)
  }

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1))
  }

  const handleNextPage = () => {
    if (!pagination.hasNextPage) {
      return
    }

    setPage((currentPage) => currentPage + 1)
  }

  const handleDelete = async (itemId) => {
    if (!isAuthenticated) {
      return
    }

    const confirmed = window.confirm('Bu kaydı silmek istediğinize emin misiniz?')

    if (!confirmed) {
      return
    }

    setListError('')
    setDetailError('')
    setDeletingId(itemId)

    try {
      await deleteHistory(itemId)
      toast.success('Kayıt silindi.')
      setSelectedDetail(null)
      setDetailError('')
      await fetchHistory()
    } catch (error) {
      const message = error.message || 'Kayıt silinemedi.'
      setListError(message)
      toast.error(message)
    } finally {
      setDeletingId('')
    }
  }

  const handleShare = async () => {
    if (!isAuthenticated || !selectedId) {
      return
    }

    setSharingId(selectedId)

    try {
      const response = await createHistoryShareLink(selectedId)
      const shareUrl = response?.shareUrl

      if (!shareUrl) {
        throw new Error('Paylaşım linki oluşturulamadı.')
      }

      await copyTextToClipboard(shareUrl)
      toast.success('Paylaşım linki kopyalandı.')
    } catch (error) {
      const message = error?.message || 'Paylaşım linki oluşturulamadı.'
      toast.error(message)
    } finally {
      setSharingId('')
    }
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6366F1]">
          Geçmiş
        </p>
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">Analiz Geçmişi</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Son analizleri listeden seçerek detaylarını görebilirsin.
        </p>
      </header>

      {listError && (
        <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200 sm:flex-row sm:items-center sm:justify-between">
          <p>{listError}</p>
          <button
            type="button"
            onClick={fetchHistory}
            disabled={isListLoading}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-red-300 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20"
          >
            {isListLoading ? 'Yenileniyor...' : 'Tekrar dene'}
          </button>
        </div>
      )}

      {detailError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {detailError}
        </div>
      )}

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Son Analizler</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">{pagination.totalItems} kayıt</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/60">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label htmlFor="historySearch" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Arama
                  </label>
                  <input
                    id="historySearch"
                    type="search"
                    maxLength={SEARCH_MAX_LENGTH}
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="Hata mesajı, kısa özet veya kategori ara"
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
                  />
                  <p className="mt-1 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                    En fazla {SEARCH_MAX_LENGTH} karakter.
                  </p>
                </div>

                <div>
                  <label htmlFor="historyCategory" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Kategori
                  </label>
                  <select
                    id="historyCategory"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value || 'all'} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="historySort" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Sıralama
                  </label>
                  <select
                    id="historySort"
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    <option value="newest">En yeni</option>
                    <option value="oldest">En eski</option>
                  </select>
                </div>

                <div className="flex items-end sm:justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#6366F1]/35 hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-indigo-300"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isListLoading && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Geçmiş yükleniyor...</p>
          )}

          {isFilteredEmpty && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Arama ya da filtrelerle eşleşen kayıt bulunamadı.</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Arama terimini, kategoriyi veya sıralamayı değiştirerek tekrar deneyebilirsin.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}

          {isInitialEmpty && (
            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Henüz analiz geçmişin yok.</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">İlk hatanı analiz ederek başlayabilirsin.</p>
              <Link
                to="/analyze"
                className="mt-3 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35"
              >
                Analiz Et
              </Link>
            </div>
          )}

          {!isListLoading && historyItems.length > 0 && (
            <ul className="mt-3 space-y-2">
              {historyItems.map((item) => {
                const isActive = selectedId === item._id
                const isDeleting = deletingId === item._id

                return (
                  <li key={item._id}>
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start">
                      <button
                        type="button"
                        onClick={() => setSelectedId(item._id)}
                        className={`min-w-0 flex-1 rounded-lg border px-3 py-3 text-left transition ${
                          isActive
                            ? 'border-[#6366F1] bg-[#6366F1] text-white'
                            : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                          {getCategoryLabel(item.category)}
                        </p>
                        <p className="mt-1 line-clamp-2 wrap-break-word text-sm font-medium">
                          {item.errorMessage}
                        </p>
                        <p className="mt-1 text-xs opacity-70">{formatDate(item.createdAt)}</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        disabled={isDeleting}
                        className="inline-flex min-h-10 w-full items-center justify-center rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-400/40 dark:hover:bg-red-500/10 dark:hover:text-red-300 sm:min-h-0 sm:w-auto sm:px-2 sm:py-1"
                      >
                        {isDeleting ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {!isListLoading && pagination.totalItems > 0 && (
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sayfa {pagination.page} / {pagination.totalPages || 1}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={!pagination.hasPrevPage || isListLoading}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Önceki
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage || isListLoading}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Detay</h3>

          {isDetailLoading && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {selectedDetail ? 'Yeni detay yükleniyor...' : 'Detay yükleniyor...'}
            </p>
          )}

          {!isDetailLoading && !selectedDetail && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Detay görmek için listeden bir kayıt seç.</p>
          )}

          {selectedDetail && (
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Kategori</p>
                <p className="wrap-break-word text-slate-700 dark:text-slate-300">{getCategoryLabel(selectedDetail.category)}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Kısa Özet</p>
                <p className="wrap-break-word text-slate-700 dark:text-slate-300">{selectedDetail.shortSummary}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Hata Mesajı</p>
                <p className="wrap-break-word text-slate-700 dark:text-slate-300">{selectedDetail.errorMessage}</p>
              </div>

              {selectedDetail.codeSnippet && (
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">Kod Parçası</p>
                  <pre className="mt-1 max-w-full overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100 dark:bg-slate-950">
                    <code>{selectedDetail.codeSnippet}</code>
                  </pre>
                </div>
              )}

              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Oluşturma Zamanı</p>
                <p className="wrap-break-word text-slate-700 dark:text-slate-300">{formatDate(selectedDetail.createdAt)}</p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={!selectedId || sharingId === selectedId}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sharingId === selectedId ? 'Paylaşım hazırlanıyor...' : 'Paylaşım Linki Oluştur'}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default HistoryPage
