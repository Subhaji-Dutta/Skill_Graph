import Badge from './Badge'
import { categoryColor, difficultyColor } from '../data'
import type { Skill } from '../types'

export default function SkillCard({ skill, onClick }: { skill: Skill; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card-hover w-full text-left bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl leading-none">{skill.icon}</span>
        <Badge variant={categoryColor[skill.category] as 'blue'}>{skill.category}</Badge>
      </div>
      <div>
        <p className="font-semibold text-slate-900 text-[15px]">{skill.name}</p>
        <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{skill.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <Badge variant={difficultyColor[skill.difficulty] as 'green'}>{skill.difficulty}</Badge>
        <span className="text-xs text-slate-400">{skill.relatedCount} related</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
          <span className="inline-block w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <span className="block h-full bg-blue-500 rounded-full" style={{ width: `${skill.popularity}%` }} />
          </span>
          {skill.popularity}%
        </span>
      </div>
    </button>
  )
}
