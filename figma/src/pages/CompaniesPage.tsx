import Badge from '../components/Badge'
import { useData } from '../DataContext'

export default function CompaniesPage() {
  const { COMPANIES } = useData()
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Companies</h1>
        <p className="text-slate-500">Top tech employers and their technology stacks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {COMPANIES.map((c, i) => (
          <div
            key={c.id}
            className="card-hover bg-white rounded-2xl border border-slate-200 overflow-hidden"
            style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)', animationDelay: `${i * 60}ms` }}
          >
            <div className="h-2" style={{ background: c.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black" style={{ background: c.color }}>
                  {c.logo}
                </div>
                {c.hiring && <Badge variant="green">Hiring</Badge>}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{c.name}</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{c.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.techs.slice(0, 3).map(t => (
                  <span key={t} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{t}</span>
                ))}
                {c.techs.length > 3 && (
                  <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">+{c.techs.length - 3}</span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{c.openPositions} open roles</span>
                <button className="text-blue-600 font-medium text-xs hover:text-blue-800">View jobs →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
