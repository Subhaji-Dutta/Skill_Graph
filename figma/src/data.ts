// Presentation-only constants. SKILLS / COMPANIES / JOBS now come from the
// API via DataContext — see src/api.ts.

export const GRAPH_NODES = [
  { id: 'react', label: 'React', type: 'skill' as const, x: 400, y: 280, r: 36 },
  { id: 'javascript', label: 'JavaScript', type: 'skill' as const, x: 220, y: 180, r: 30 },
  { id: 'typescript', label: 'TypeScript', type: 'skill' as const, x: 590, y: 170, r: 28 },
  { id: 'nextjs', label: 'Next.js', type: 'skill' as const, x: 580, y: 380, r: 28 },
  { id: 'redux', label: 'Redux', type: 'skill' as const, x: 260, y: 380, r: 24 },
  { id: 'google', label: 'Google', type: 'company' as const, x: 700, y: 270, r: 26 },
  { id: 'netflix', label: 'Netflix', type: 'company' as const, x: 650, y: 450, r: 24 },
  { id: 'meta', label: 'Meta', type: 'company' as const, x: 160, y: 320, r: 24 },
  { id: 'amazon', label: 'Amazon', type: 'company' as const, x: 480, y: 470, r: 24 },
  { id: 'fe_dev', label: 'Frontend Dev', type: 'job' as const, x: 140, y: 440, r: 24 },
  { id: 'fullstack', label: 'Full Stack', type: 'job' as const, x: 330, y: 480, r: 22 },
  { id: 'ui_eng', label: 'UI Engineer', type: 'job' as const, x: 500, y: 140, r: 22 },
]

export const GRAPH_EDGES = [
  ['react', 'javascript'], ['react', 'typescript'], ['react', 'nextjs'], ['react', 'redux'],
  ['react', 'google'], ['react', 'netflix'], ['react', 'meta'], ['react', 'amazon'],
  ['react', 'fe_dev'], ['react', 'fullstack'], ['react', 'ui_eng'],
  ['javascript', 'redux'], ['typescript', 'nextjs'],
]

export const categoryColor: Record<string, string> = {
  Frontend: 'blue',
  Backend: 'green',
  Cloud: 'purple',
  DevOps: 'orange',
  AI: 'red',
  Database: 'gray',
}

export const difficultyColor: Record<string, string> = {
  Beginner: 'green',
  Intermediate: 'blue',
  Advanced: 'purple',
}
