import type { Page } from '../types'

export default function Nav({ current, navigate }: { current: Page; navigate: (p: Page) => void }) {
  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Explore', page: 'explore' },
    { label: 'Graph', page: 'graph' },
    { label: 'Companies', page: 'companies' },
    { label: 'Jobs', page: 'jobs' },
    { label: 'Analytics', page: 'analytics' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-[60px] gap-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 font-bold text-slate-900 text-[15px] shrink-0"
        >
          <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold">S</span>
          Skill Graph
        </button>
        <nav className="flex items-center gap-1 ml-2">
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                current === l.page
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href="https://github.com" aria-label="GitHub" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
          </a>
        </div>
      </div>
    </header>
  )
}
