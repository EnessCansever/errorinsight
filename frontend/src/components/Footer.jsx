import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-7">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Fixora</p>
            <p className="text-xs leading-6 text-slate-500 sm:text-sm dark:text-slate-400">AI destekli hata analizi aracı.</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Ürün</p>
            <div className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <Link
                to="/analyze"
                className="w-fit rounded-sm transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/30 dark:hover:text-indigo-300"
              >
                Analyze
              </Link>
              <Link
                to="/errors/cannot-read-properties-of-undefined-reading-map"
                className="w-fit rounded-sm transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/30 dark:hover:text-indigo-300"
              >
                Error Guides
              </Link>
              <Link
                to="/privacy"
                className="w-fit rounded-sm transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/30 dark:hover:text-indigo-300"
              >
                Privacy
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Bağlantılar</p>
            <div className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <a
                href="https://github.com/EnessCansever/fixora"
                target="_blank"
                rel="noreferrer"
                className="w-fit rounded-sm transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/30 dark:hover:text-indigo-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/enes-cansever-478766244/"
                target="_blank"
                rel="noreferrer"
                className="w-fit rounded-sm transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/30 dark:hover:text-indigo-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:text-sm dark:border-slate-800 dark:text-slate-400">
          © 2026 Fixora. Built by Enes Cansever.
        </p>
      </div>
    </footer>
  )
}

export default Footer
