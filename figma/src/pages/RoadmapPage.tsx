import Badge from '../components/Badge'
import { categoryColor } from '../data'
import { useData } from '../DataContext'

const ROADMAP_PATH = ['html', 'css', 'javascript', 'typescript', 'react', 'nextjs']
const COMPLETED_COUNT = 3

export default function RoadmapPage() {
  const { SKILLS } = useData()
  // A seeded skill may be missing from the catalog — drop it rather than render a hole.
  const skills = ROADMAP_PATH.map(id => SKILLS.find(s => s.id === id)).filter(s => s !== undefined)

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Frontend Roadmap</h1>
        <p className="text-slate-500">Your guided path to becoming a frontend developer</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${(COMPLETED_COUNT / skills.length) * 100}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-700">{COMPLETED_COUNT}/{skills.length} complete</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-slate-200" />
        <div className="space-y-0">
          {skills.map((skill, i) => {
            const done = i < COMPLETED_COUNT
            const current = i === COMPLETED_COUNT
            return (
              <div key={skill.id} className="relative flex items-start gap-5 pb-2" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`relative z-10 w-[54px] h-[54px] rounded-2xl flex flex-col items-center justify-center shrink-0 border-2 transition-all ${
                  done    ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100' :
                  current ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100 animate-[pulse-glow_2s_infinite]' :
                            'bg-white border-slate-200'
                }`}>
                  <span className="text-xl">{skill.icon}</span>
                </div>
                <div
                  className={`flex-1 bg-white rounded-2xl border p-4 mb-4 transition-all ${current ? 'border-blue-200 shadow-md shadow-blue-50' : 'border-slate-200'}`}
                  style={{ boxShadow: current ? '0 4px 16px rgba(37,99,235,0.08)' : '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-900">{skill.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={categoryColor[skill.category] as 'blue'}>{skill.category}</Badge>
                      {done    && <Badge variant="green">Done</Badge>}
                      {current && <Badge variant="blue">Current</Badge>}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{skill.description.substring(0, 90)}...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>⏱ {skill.learningTime}</span>
                    <span>📈 {skill.demand} demand</span>
                    <span>💰 {skill.salary.split('–')[0].trim()}+</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
