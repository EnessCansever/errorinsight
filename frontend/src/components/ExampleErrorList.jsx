const EXAMPLE_ERRORS = [
  {
    title: 'Type Error - map',
    errorMessage: "Cannot read properties of undefined (reading 'map')",
    codeSnippet: "const items = data.items\nconst names = items.map((item) => item.name)",
  },
  {
    title: 'Type Error - function',
    errorMessage: 'items.filter is not a function',
    codeSnippet: "const items = 'hello'\nconst result = items.filter(Boolean)",
  },
  {
    title: 'Reference Error',
    errorMessage: 'myVar is not defined',
    codeSnippet: 'console.log(myVar)',
  },
  {
    title: 'React Hydration',
    errorMessage: 'Hydration failed because the initial UI does not match what was rendered on the server',
    codeSnippet: '<div>{new Date().toLocaleString()}</div>',
  },
  {
    title: 'Network Error',
    errorMessage: 'Failed to fetch',
    codeSnippet: "fetch('/api/users').then((res) => res.json())",
  },
]

function ExampleErrorList({ onSelect }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">Hizli Test Ornekleri</h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Asagidaki orneklerden birine tiklayarak hata mesaji ve kod alanlarini hizlica doldurabilirsin.
      </p>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {EXAMPLE_ERRORS.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onSelect(item)}
            className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-slate-300 hover:bg-white"
          >
            <p className="text-xs font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{item.errorMessage}</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ExampleErrorList
