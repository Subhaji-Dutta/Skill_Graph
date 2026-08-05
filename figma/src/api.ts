const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`)
  return res.json()
}

export const api = {
  skills: () => get<import('./types').Skill[]>('/api/skills'),
  companies: () => get<import('./types').Company[]>('/api/companies'),
  jobs: () => get<import('./types').Job[]>('/api/jobs'),
  roadmap: (skillId: string) =>
    get<{ id: string; name: string; level: number }[]>(`/api/roadmap/${skillId}`),
}
