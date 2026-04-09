import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/analyze', label: 'Analiz' },
  { to: '/history', label: 'Gecmis' },
]

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Fixora</h1>
          <p className="text-xs text-slate-500">Simple error analysis demo</p>
        </div>
        <ul className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]/35 ${
                    isActive
                      ? 'bg-[#6366F1] text-white'
                      : 'text-slate-700 hover:bg-indigo-50 hover:text-[#6366F1]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
