import { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'
import type { Skill, Company, Job } from './types'

type Data = { SKILLS: Skill[]; COMPANIES: Company[]; JOBS: Job[] }

const DataContext = createContext<Data | null>(null)

/**
 * Data the pages used to import statically from data.ts. Fetched once here so
 * the page bodies keep reading `SKILLS` / `COMPANIES` / `JOBS` unchanged.
 */
export function useData(): Data {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside <DataProvider>')
  return ctx
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([api.skills(), api.companies(), api.jobs()])
      .then(([SKILLS, COMPANIES, JOBS]) => {
        if (!cancelled) setData({ SKILLS, COMPANIES, JOBS })
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="text-lg font-semibold text-slate-900">Can't reach the API</p>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
          <p className="text-sm text-slate-500 mt-4">
            Start it with <code className="bg-slate-100 px-1.5 py-0.5 rounded">npm run dev</code> in{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded">server/</code>.
          </p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-slate-400 text-sm">Loading skill graph…</p>
      </div>
    )
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
