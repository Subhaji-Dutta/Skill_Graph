const configs = {
  search:    { emoji: '🔍', title: 'No skills found',        desc: 'Try a different search term or clear your filters.' },
  roadmap:   { emoji: '🗺️', title: 'No roadmap yet',         desc: 'Select a skill to generate your personalized learning roadmap.' },
  companies: { emoji: '🏢', title: 'No companies found',     desc: 'No companies match your current filters.' },
  jobs:      { emoji: '💼', title: 'No jobs found',           desc: 'Try adjusting your search or removing the remote filter.' },
  error:     { emoji: '⚠️', title: 'Database unavailable',   desc: 'CognoDB could not be reached. Please check your connection and try again.' },
}

export default function EmptyState({ type }: { type: keyof typeof configs }) {
  const c = configs[type]
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">{c.emoji}</span>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{c.title}</h3>
      <p className="text-slate-500 max-w-xs text-sm leading-relaxed">{c.desc}</p>
      {type === 'error' && (
        <button className="btn-primary mt-6">Retry Connection</button>
      )}
    </div>
  )
}
