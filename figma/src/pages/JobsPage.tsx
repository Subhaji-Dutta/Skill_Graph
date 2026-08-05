import { useState } from 'react'
import Badge from '../components/Badge'
import EmptyState from '../components/EmptyState'
import { useData } from '../DataContext'

export default function JobsPage() {
  const { JOBS, SKILLS } = useData()
  const [search, setSearch]         = useState('')
  const [remoteOnly, setRemoteOnly] = useState(false)

  const filtered = JOBS.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (!remoteOnly || j.remote)
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Jobs</h1>
        <p className="text-slate-500">Open positions matched to your skill graph</p>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`w-9 h-5 rounded-full transition-colors ${remoteOnly ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full bg-white shadow transition-transform mt-0.5 ${remoteOnly ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-slate-600">Remote only</span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState type="jobs" />
      ) : (
        <div className="space-y-4">
          {filtered.map((job, i) => (
            <div
              key={job.id}
              className="card-hover bg-white rounded-2xl border border-slate-200 p-5"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">{job.title}</h3>
                    {job.remote && <Badge variant="blue">Remote</Badge>}
                    <Badge variant="gray">{job.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 flex-wrap">
                    <span>🏢 {job.company}</span>
                    <span>⏱ {job.experience}</span>
                    <span>📅 {job.posted}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map(s => {
                      const sk = SKILLS.find(sk => sk.name === s)
                      return sk ? (
                        <span key={s} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">
                          {sk.icon} {s}
                        </span>
                      ) : (
                        <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium">{s}</span>
                      )
                    })}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-emerald-600 text-base">${(job.salaryMin / 1000).toFixed(0)}k–${(job.salaryMax / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-slate-400 mb-3">per year</p>
                  <button className="btn-primary text-xs px-4 py-2">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
