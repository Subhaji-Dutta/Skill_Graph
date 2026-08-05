import { useState } from 'react'
import Badge from '../components/Badge'
import { categoryColor, difficultyColor } from '../data'
import { useData } from '../DataContext'
import type { Page } from '../types'

type Tab = 'overview' | 'prerequisites' | 'companies' | 'jobs' | 'learning'
const TABS: Tab[] = ['overview', 'prerequisites', 'companies', 'jobs', 'learning']

export default function SkillDetailPage({ skillId, navigate }: { skillId: string; navigate: (p: Page) => void }) {
  const { SKILLS, COMPANIES, JOBS } = useData()
  const skill = SKILLS.find(s => s.id === skillId) || SKILLS[0]
  const [tab, setTab] = useState<Tab>('overview')
  const prereqs = SKILLS.filter(s => skill.prerequisites.includes(s.id))

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
      <button onClick={() => navigate('explore')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        ← Back to Explorer
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-[76px]" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-5xl">{skill.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{skill.name}</h1>
                <Badge variant={categoryColor[skill.category] as 'blue'}>{skill.category}</Badge>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Difficulty</span>
                <Badge variant={difficultyColor[skill.difficulty] as 'green'}>{skill.difficulty}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Demand</span>
                <Badge variant={skill.demand === 'Very High' ? 'green' : 'blue'}>{skill.demand}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Popularity</span>
                <span className="font-semibold text-slate-900">{skill.popularity}%</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Score</span>
                  <span className="font-medium text-slate-700">{skill.popularity}/100</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${skill.popularity}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Related skills</span>
                <span className="font-semibold text-slate-900">{skill.relatedCount}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="btn-primary w-full" onClick={() => navigate('graph')}>View Graph</button>
              <button className="btn-secondary w-full" onClick={() => navigate('roadmap')}>Career Roadmap</button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex border-b border-slate-200">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 px-4 py-3.5 text-sm font-medium capitalize transition-colors ${
                    tab === t
                      ? 'border-b-2 border-blue-600 text-blue-700 bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="p-6">
              {tab === 'overview' && (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">About</h3>
                    <p className="text-slate-700 leading-relaxed">{skill.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Average Salary',   value: skill.salary,                        icon: '💰' },
                      { label: 'Market Demand',    value: skill.demand,                        icon: '📈' },
                      { label: 'Learning Time',    value: skill.learningTime,                  icon: '⏱️' },
                      { label: 'Companies Hiring', value: `${skill.companies.length} companies`, icon: '🏢' },
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4">
                        <span className="text-lg">{item.icon}</span>
                        <p className="text-xs text-slate-500 mt-2">{item.label}</p>
                        <p className="font-semibold text-slate-900 text-sm mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'prerequisites' && (
                <div className="animate-fade-in">
                  {prereqs.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <span className="text-4xl mb-3 block">✅</span>
                      <p className="font-medium">No prerequisites</p>
                      <p className="text-sm mt-1">You can start learning {skill.name} right away!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-500 mb-4">Learn these skills first to build a strong foundation:</p>
                      {prereqs.map(p => (
                        <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                          <span className="text-2xl">{p.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.category} · {p.difficulty}</p>
                          </div>
                          <Badge variant={difficultyColor[p.difficulty] as 'green'}>{p.difficulty}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'companies' && (
                <div className="space-y-3 animate-fade-in">
                  {COMPANIES.filter(c => skill.companies.includes(c.name)).map(c => (
                    <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: c.color }}>
                        {c.logo}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.openPositions} open positions</p>
                      </div>
                      {c.hiring && <Badge variant="green">Hiring</Badge>}
                    </div>
                  ))}
                </div>
              )}

              {tab === 'jobs' && (
                <div className="space-y-3 animate-fade-in">
                  {JOBS.filter(j => j.skills.some(s => skill.name === s)).slice(0, 4).map(j => (
                    <div key={j.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{j.title}</p>
                          <p className="text-xs text-slate-500">{j.company} · {j.experience}</p>
                        </div>
                        {j.remote && <Badge variant="blue">Remote</Badge>}
                      </div>
                      <p className="text-sm font-semibold text-emerald-600">${(j.salaryMin / 1000).toFixed(0)}k – ${(j.salaryMax / 1000).toFixed(0)}k</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'learning' && (
                <div className="animate-fade-in">
                  <p className="text-sm text-slate-500 mb-5">Estimated time: <strong className="text-slate-900">{skill.learningTime}</strong></p>
                  <div className="space-y-3">
                    {[
                      { step: 1, title: 'Learn the fundamentals',    desc: 'Understand core concepts and theory',         done: true },
                      { step: 2, title: 'Build small projects',       desc: 'Apply knowledge with hands-on practice',     done: true },
                      { step: 3, title: 'Study best practices',       desc: 'Learn patterns used in production',          done: false },
                      { step: 4, title: 'Contribute to open source',  desc: 'Real-world collaboration experience',        done: false },
                      { step: 5, title: 'Build a portfolio project',  desc: 'Showcase your skills to employers',          done: false },
                    ].map(item => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${item.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {item.done ? '✓' : item.step}
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${item.done ? 'text-emerald-700' : 'text-slate-900'}`}>{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
