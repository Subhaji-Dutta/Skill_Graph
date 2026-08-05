import { useState } from 'react'
import Badge from '../components/Badge'
import { GRAPH_NODES, GRAPH_EDGES } from '../data'

const NODE_COLORS = { skill: '#2563eb', company: '#10b981', job: '#8b5cf6' } as const
const GLOW_COLORS = { skill: 'rgba(37,99,235,0.3)', company: 'rgba(16,185,129,0.3)', job: 'rgba(139,92,246,0.3)' } as const

type FilterType = 'all' | 'skill' | 'company' | 'job'

export default function GraphPage() {
  const [hovered, setHovered]   = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [zoom, setZoom]         = useState(1)
  const [filter, setFilter]     = useState<FilterType>('all')

  const visNodes = filter === 'all' ? GRAPH_NODES : GRAPH_NODES.filter(n => n.id === 'react' || n.type === filter)
  const selectedNode = GRAPH_NODES.find(n => n.id === selected)

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
      {/* Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {(['skill', 'company', 'job'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(filter === type ? 'all' : type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === type ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: NODE_COLORS[type] }} />
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-bold flex items-center justify-center transition-colors">+</button>
          <span className="text-slate-400 text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.max(0.4, z - 0.1))} className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-bold flex items-center justify-center transition-colors">−</button>
          <button onClick={() => setZoom(1)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium transition-colors">Fit</button>
          <button onClick={() => { setSelected(null); setHovered(null) }} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium transition-colors">Reset</button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden">
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 860 560"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
        >
          <defs>
            {(Object.keys(GLOW_COLORS) as Array<keyof typeof GLOW_COLORS>).map(type => (
              <filter key={type} id={`glow-${type}`}>
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
          </defs>

          {/* Edges */}
          {GRAPH_EDGES.map(([a, b], i) => {
            const na = visNodes.find(n => n.id === a)
            const nb = visNodes.find(n => n.id === b)
            if (!na || !nb) return null
            const active = hovered === a || hovered === b || selected === a || selected === b
            const mx = (na.x + nb.x) / 2
            const my = (na.y + nb.y) / 2 - 30
            return (
              <path
                key={i}
                d={`M ${na.x} ${na.y} Q ${mx} ${my} ${nb.x} ${nb.y}`}
                fill="none"
                stroke={active ? '#3b82f6' : '#334155'}
                strokeWidth={active ? 2 : 1}
                opacity={active ? 1 : 0.5}
                strokeDasharray={active ? 'none' : '5 4'}
                className="graph-edge"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            )
          })}

          {/* Nodes */}
          {visNodes.map(node => {
            const isHovered  = hovered === node.id
            const isSelected = selected === node.id
            const r     = isHovered || isSelected ? node.r * 1.15 : node.r
            const color = NODE_COLORS[node.type]
            const glow  = GLOW_COLORS[node.type]
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => setSelected(selected === node.id ? null : node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={node.x} cy={node.y} r={r + 10} fill={glow} opacity={isHovered || isSelected ? 0.5 : 0} style={{ transition: 'all 0.2s' }} />
                <circle cx={node.x} cy={node.y} r={r} fill={color} filter={isSelected ? `url(#glow-${node.type})` : undefined}
                  strokeWidth={isSelected ? 3 : 0} stroke="white" style={{ transition: 'all 0.2s' }} />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize={node.r * 0.42} fontWeight="700" fontFamily="Inter,sans-serif">
                  {node.label.length > 7 ? node.label.slice(0, 7) : node.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800 p-3">
          <p className="text-xs text-slate-500 mb-2 font-medium">Legend</p>
          {(Object.keys(NODE_COLORS) as Array<keyof typeof NODE_COLORS>).map(type => (
            <div key={type} className="flex items-center gap-2 text-xs text-slate-400 mb-1 last:mb-0">
              <span className="w-3 h-3 rounded-full" style={{ background: NODE_COLORS[type] }} />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>

        {/* Selected node tooltip */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-700 p-4 w-56 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <Badge variant={selectedNode.type === 'skill' ? 'blue' : selectedNode.type === 'company' ? 'green' : 'purple'}>
                {selectedNode.type}
              </Badge>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white text-xs">✕</button>
            </div>
            <p className="font-semibold text-white text-sm">{selectedNode.label}</p>
            <p className="text-xs text-slate-400 mt-1">
              {selectedNode.type === 'skill'   ? `Connected to ${GRAPH_EDGES.filter(e => e.includes(selectedNode.id)).length} nodes` :
               selectedNode.type === 'company' ? 'Top tech employer' : 'Open positions available'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
