import { useState, useEffect, useCallback } from 'react'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import SkillDetailPage from './pages/SkillDetailPage'
import RoadmapPage from './pages/RoadmapPage'
import GraphPage from './pages/GraphPage'
import CompaniesPage from './pages/CompaniesPage'
import JobsPage from './pages/JobsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import { DataProvider } from './DataContext'
import type { Page } from './types'

export default function App() {
  return (
    <DataProvider>
      <AppShell />
    </DataProvider>
  )
}

function AppShell() {
  const [page, setPage]                 = useState<Page>('home')
  const [selectedSkill, setSelectedSkill] = useState<string>('react')
  const [toast, setToast]               = useState<string | null>(null)

  const navigate = useCallback((p: Page, skillId?: string) => {
    if (skillId) setSelectedSkill(skillId)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav current={page} navigate={navigate} />

      {page === 'home'      && <HomePage navigate={navigate} />}
      {page === 'explore'   && <ExplorePage navigate={navigate} setSelectedSkill={setSelectedSkill} />}
      {page === 'skill'     && <SkillDetailPage skillId={selectedSkill} navigate={navigate} />}
      {page === 'roadmap'   && <RoadmapPage />}
      {page === 'graph'     && <GraphPage />}
      {page === 'companies' && <CompaniesPage />}
      {page === 'jobs'      && <JobsPage />}
      {page === 'analytics' && <AnalyticsPage />}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm animate-fade-in flex items-center gap-3">
          <span>✓</span> {toast}
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">✕</button>
        </div>
      )}
    </div>
  )
}
