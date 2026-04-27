function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-4 text-xs leading-6 text-slate-500 sm:px-4 sm:text-sm dark:text-slate-400">
        <p>© 2026 Fixora. AI destekli hata analizi.</p>
        <a
          href="https://github.com/EnessCansever/fixora"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-slate-700 dark:hover:text-slate-200"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
