import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts'
import { useData } from '../DataContext'

const DEMAND_DATA = [
  { month: 'Jan', React: 88, TypeScript: 72, Python: 95 },
  { month: 'Feb', React: 90, TypeScript: 76, Python: 96 },
  { month: 'Mar', React: 91, TypeScript: 79, Python: 94 },
  { month: 'Apr', React: 93, TypeScript: 82, Python: 97 },
  { month: 'May', React: 95, TypeScript: 85, Python: 96 },
  { month: 'Jun', React: 97, TypeScript: 88, Python: 98 },
]

const CATEGORY_DATA = [
  { category: 'Frontend', avgSalary: 130 },
  { category: 'Backend',  avgSalary: 125 },
  { category: 'DevOps',   avgSalary: 145 },
  { category: 'Cloud',    avgSalary: 150 },
  { category: 'AI',       avgSalary: 165 },
  { category: 'Database', avgSalary: 120 },
]

const RADAR_DATA = [
  { subject: 'Frontend', value: 92 },
  { subject: 'Backend',  value: 78 },
  { subject: 'DevOps',   value: 65 },
  { subject: 'Cloud',    value: 70 },
  { subject: 'AI/ML',    value: 55 },
  { subject: 'Database', value: 80 },
]

const KPIS = [
  { label: 'Total Skills',  value: '248',   change: '+12',   up: true },
  { label: 'Avg Salary',    value: '$138k',  change: '+8.2%', up: true },
  { label: 'Job Postings',  value: '1,842', change: '+24%',  up: true },
  { label: 'Companies',     value: '94',    change: '+3',    up: true },
]

export default function AnalyticsPage() {
  const { SKILLS } = useData()
  const popularityData = [...SKILLS].sort((a, b) => b.popularity - a.popularity).slice(0, 8).map(s => ({
    name: s.name, popularity: s.popularity,
  }))

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-500">Skill trends, demand signals, and market insights</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPIS.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p className="text-sm text-slate-500 mb-1">{k.label}</p>
            <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
            <span className={`text-xs font-semibold ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>↑ {k.change} this month</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Popularity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 className="font-semibold text-slate-900 mb-4">Most Popular Skills</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={popularityData} layout="vertical" margin={{ left: 20, right: 16 }}>
              <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} width={80} />
              <Tooltip formatter={(v) => [`${v}%`, 'Popularity']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="popularity" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Demand trend */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 className="font-semibold text-slate-900 mb-4">Demand Trend (6 months)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={DEMAND_DATA} margin={{ right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="React"      stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="TypeScript" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Python"     stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category avg salary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 className="font-semibold text-slate-900 mb-4">Avg Salary by Category ($k)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CATEGORY_DATA} margin={{ right: 16 }}>
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[100, 175]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip formatter={(v) => [`$${v}k`, 'Avg Salary']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="avgSalary" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h3 className="font-semibold text-slate-900 mb-4">Job Demand by Domain</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
              <Radar name="Demand" dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
