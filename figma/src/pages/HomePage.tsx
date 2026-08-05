import SkillCard from '../components/SkillCard'
import { useData } from '../DataContext'
import type { Page } from '../types'

function GraphIllustration() {
  const nodes = [
    { x: 200, y: 150, label: 'React', color: '#2563eb', r: 28 },
    { x: 90,  y: 80,  label: 'JS',    color: '#f59e0b', r: 22 },
    { x: 330, y: 90,  label: 'TS',    color: '#3b82f6', r: 20 },
    { x: 80,  y: 220, label: 'CSS',   color: '#8b5cf6', r: 20 },
    { x: 320, y: 230, label: 'Next',  color: '#111',    r: 24 },
    { x: 200, y: 280, label: 'Redux', color: '#764abc', r: 18 },
    { x: 370, y: 170, label: 'Google',color: '#10b981', r: 20 },
    { x: 50,  y: 150, label: 'HTML',  color: '#ef4444', r: 18 },
  ]
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [1, 3], [2, 4], [3, 7],
  ]
  return (
    <svg viewBox="0 0 430 320" className="w-full max-w-md mx-auto animate-float" role="img" aria-label="Skill graph illustration">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 3"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r + 6} fill={n.color} opacity={0.08} />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize={Math.max(8, n.r * 0.48)} fontWeight="700" fontFamily="Inter,sans-serif">
            {n.label.slice(0, 4)}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const { SKILLS } = useData()
  const stats = [
    { icon: '⚡', label: 'Skills',        value: '248',   desc: 'Across 6 categories' },
    { icon: '🏢', label: 'Companies',     value: '94',    desc: 'Top tech employers' },
    { icon: '💼', label: 'Jobs',          value: '1,842', desc: 'Active listings' },
    { icon: '🔗', label: 'Relationships', value: '3,107', desc: 'Graph connections' },
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Powered by CognoDB Graph Database
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
              Explore Developer Skills Through{' '}
              <span className="text-blue-600">Connected Data</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Discover prerequisites, career paths, companies, and job opportunities using a graph database that maps every relationship between technologies.
            </p>
            <div className="flex items-center gap-3">
              <button className="btn-primary text-[15px] px-6 py-3" onClick={() => navigate('explore')}>
                Explore Skills →
              </button>
              <button className="btn-secondary text-[15px] px-6 py-3" onClick={() => navigate('graph')}>
                View Graph
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <GraphIllustration />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6 card-hover"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', animationDelay: `${i * 80}ms` }}
            >
              <span className="text-2xl mb-3 block">{s.icon}</span>
              <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{s.label}</p>
              <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured skills */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Trending Skills</h2>
          <button onClick={() => navigate('explore')} className="text-sm text-blue-600 font-medium hover:text-blue-800">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SKILLS.slice(0, 5).map(s => (
            <SkillCard key={s.id} skill={s} onClick={() => navigate('skill')} />
          ))}
        </div>
      </section>

      {/* Feature callouts */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🗺️', title: 'Career Roadmaps',  desc: 'Follow guided paths from beginner to expert with prerequisite chains mapped in the graph.', action: () => navigate('roadmap') },
            { icon: '🏢', title: 'Company Insights',  desc: 'See which technologies top companies use and discover open roles that match your skills.',   action: () => navigate('companies') },
            { icon: '📊', title: 'Skill Analytics',   desc: 'Understand demand trends, salary ranges, and how skills connect across the tech ecosystem.',  action: () => navigate('analytics') },
          ].map((f, i) => (
            <button
              key={i}
              onClick={f.action}
              className="card-hover bg-white rounded-2xl border border-slate-200 p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <p className="font-semibold text-slate-900 mb-2">{f.title}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">S</span>
            Skill Graph Explorer — Powered by CognoDB
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
