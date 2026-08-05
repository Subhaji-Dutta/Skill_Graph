export type Category = 'Frontend' | 'Backend' | 'Cloud' | 'DevOps' | 'AI' | 'Database'

export interface Skill {
  id: string
  name: string
  category: Category
  icon: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  popularity: number
  relatedCount: number
  description: string
  salary: string
  demand: 'High' | 'Very High' | 'Medium'
  learningTime: string
  prerequisites: string[]
  companies: string[]
  jobs: string[]
}

export interface Company {
  id: string
  name: string
  logo: string
  color: string
  techs: string[]
  openPositions: number
  hiring: boolean
  description: string
}

export interface Job {
  id: string
  title: string
  company: string
  salaryMin: number
  salaryMax: number
  skills: string[]
  experience: string
  remote: boolean
  type: 'Full-time' | 'Contract' | 'Part-time'
  posted: string
}

export interface GraphNode {
  id: string
  label: string
  type: 'skill' | 'company' | 'job'
  x: number
  y: number
  r: number
}

export type Page = 'home' | 'explore' | 'skill' | 'roadmap' | 'graph' | 'companies' | 'jobs' | 'analytics'
