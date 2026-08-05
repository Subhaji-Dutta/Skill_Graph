import { useState } from 'react'
import SkillCard from '../components/SkillCard'
import EmptyState from '../components/EmptyState'
import { useData } from '../DataContext'
import type { Category, Page } from '../types'

export default function ExplorePage({ navigate, setSelectedSkill }: { navigate: (p: Page) => void; setSelectedSkill: (id: string) => void }) {
  const { SKILLS } = useData()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const categories: (Category | 'All')[] = ['All', 'Frontend', 'Backend', 'Cloud', 'DevOps', 'AI', 'Database']

  const filtered = SKILLS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="flex animate-fade-in" style={{ minHeight: 'calc(100vh - 60px)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-4 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Filter by Category</p>
        <nav className="flex flex-col gap-0.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === c
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl">
          <div className="relative mb-6">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search React, Python, Docker..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" />
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-4">{filtered.length} skills found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(s => (
                  <SkillCard key={s.id} skill={s} onClick={() => { setSelectedSkill(s.id); navigate('skill') }} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
