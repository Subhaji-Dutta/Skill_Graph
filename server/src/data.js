export const SKILLS = [
  {
    id: 'html', name: 'HTML', category: 'Frontend', icon: '🌐', difficulty: 'Beginner',
    popularity: 95, relatedCount: 12, description: 'The standard markup language for creating web pages and web applications.',
    salary: '$65,000 – $95,000', demand: 'High', learningTime: '2–4 weeks',
    prerequisites: [], companies: ['Google', 'Microsoft', 'Amazon', 'Netflix'],
    jobs: ['Frontend Developer', 'Web Developer', 'UI Engineer']
  },
  {
    id: 'css', name: 'CSS', category: 'Frontend', icon: '🎨', difficulty: 'Beginner',
    popularity: 93, relatedCount: 10, description: 'Style sheet language for describing the presentation of a document written in HTML.',
    salary: '$65,000 – $95,000', demand: 'High', learningTime: '3–5 weeks',
    prerequisites: ['html'], companies: ['Google', 'Microsoft', 'Netflix', 'Shopify'],
    jobs: ['Frontend Developer', 'UI Designer', 'Web Developer']
  },
  {
    id: 'javascript', name: 'JavaScript', category: 'Frontend', icon: '⚡', difficulty: 'Intermediate',
    popularity: 98, relatedCount: 24, description: 'A lightweight, interpreted, object-oriented programming language with first-class functions.',
    salary: '$85,000 – $135,000', demand: 'Very High', learningTime: '3–6 months',
    prerequisites: ['html', 'css'], companies: ['Google', 'Netflix', 'Meta', 'Amazon', 'Microsoft'],
    jobs: ['Frontend Developer', 'Full Stack Developer', 'JavaScript Engineer']
  },
  {
    id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: '🔷', difficulty: 'Intermediate',
    popularity: 91, relatedCount: 18, description: 'A strongly typed programming language that builds on JavaScript, giving you better tooling.',
    salary: '$95,000 – $150,000', demand: 'Very High', learningTime: '1–2 months',
    prerequisites: ['javascript'], companies: ['Microsoft', 'Google', 'Airbnb', 'Slack', 'Stripe'],
    jobs: ['TypeScript Engineer', 'Full Stack Developer', 'Senior Frontend Engineer']
  },
  {
    id: 'react', name: 'React', category: 'Frontend', icon: '⚛️', difficulty: 'Intermediate',
    popularity: 97, relatedCount: 22, description: 'A JavaScript library for building user interfaces with a component-based architecture.',
    salary: '$105,000 – $165,000', demand: 'Very High', learningTime: '2–4 months',
    prerequisites: ['javascript', 'typescript'], companies: ['Meta', 'Netflix', 'Airbnb', 'Stripe', 'Shopify'],
    jobs: ['React Developer', 'Frontend Engineer', 'UI Engineer', 'Full Stack Developer']
  },
  {
    id: 'nextjs', name: 'Next.js', category: 'Frontend', icon: '▲', difficulty: 'Advanced',
    popularity: 88, relatedCount: 16, description: 'The React framework for production — with hybrid static & server rendering, TypeScript support.',
    salary: '$115,000 – $175,000', demand: 'Very High', learningTime: '1–3 months',
    prerequisites: ['react', 'typescript'], companies: ['Vercel', 'Netflix', 'TikTok', 'Twitch'],
    jobs: ['Next.js Developer', 'Full Stack Engineer', 'React Engineer']
  },
  {
    id: 'python', name: 'Python', category: 'Backend', icon: '🐍', difficulty: 'Beginner',
    popularity: 96, relatedCount: 28, description: 'A high-level, general-purpose programming language emphasizing code readability.',
    salary: '$90,000 – $145,000', demand: 'Very High', learningTime: '2–4 months',
    prerequisites: [], companies: ['Google', 'Netflix', 'Dropbox', 'Instagram', 'Spotify'],
    jobs: ['Python Developer', 'Backend Engineer', 'Data Engineer', 'ML Engineer']
  },
  {
    id: 'nodejs', name: 'Node.js', category: 'Backend', icon: '🟩', difficulty: 'Intermediate',
    popularity: 89, relatedCount: 20, description: "A JavaScript runtime built on Chrome's V8 engine for building fast, scalable network apps.",
    salary: '$95,000 – $150,000', demand: 'High', learningTime: '2–3 months',
    prerequisites: ['javascript'], companies: ['Netflix', 'LinkedIn', 'PayPal', 'Uber'],
    jobs: ['Node.js Developer', 'Backend Engineer', 'Full Stack Developer']
  },
  {
    id: 'docker', name: 'Docker', category: 'DevOps', icon: '🐳', difficulty: 'Intermediate',
    popularity: 87, relatedCount: 15, description: 'A platform to develop, ship, and run applications in containers for consistent environments.',
    salary: '$100,000 – $155,000', demand: 'Very High', learningTime: '2–4 weeks',
    prerequisites: ['linux'], companies: ['Docker', 'Google', 'Microsoft', 'Amazon', 'IBM'],
    jobs: ['DevOps Engineer', 'Platform Engineer', 'SRE', 'Cloud Engineer']
  },
  {
    id: 'kubernetes', name: 'Kubernetes', category: 'DevOps', icon: '☸️', difficulty: 'Advanced',
    popularity: 82, relatedCount: 14, description: 'An open-source container orchestration system for automating deployment and scaling.',
    salary: '$120,000 – $180,000', demand: 'Very High', learningTime: '3–6 months',
    prerequisites: ['docker'], companies: ['Google', 'Red Hat', 'Microsoft', 'VMware', 'Amazon'],
    jobs: ['Kubernetes Engineer', 'SRE', 'Platform Engineer', 'Cloud Architect']
  },
  {
    id: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: '🐘', difficulty: 'Intermediate',
    popularity: 85, relatedCount: 12, description: 'A powerful, open source object-relational database system with strong reliability.',
    salary: '$95,000 – $145,000', demand: 'High', learningTime: '4–8 weeks',
    prerequisites: [], companies: ['Heroku', 'GitLab', 'Twitch', 'Instagram'],
    jobs: ['Database Engineer', 'Backend Developer', 'Data Engineer', 'Full Stack Developer']
  },
  {
    id: 'graphql', name: 'GraphQL', category: 'Backend', icon: '🔗', difficulty: 'Intermediate',
    popularity: 78, relatedCount: 13, description: 'A query language for your API and a runtime for executing those queries with your existing data.',
    salary: '$100,000 – $160,000', demand: 'High', learningTime: '3–5 weeks',
    prerequisites: ['javascript', 'nodejs'], companies: ['Meta', 'GitHub', 'Twitter', 'Shopify'],
    jobs: ['API Engineer', 'Backend Developer', 'Full Stack Engineer']
  },
  {
    id: 'aws', name: 'AWS', category: 'Cloud', icon: '☁️', difficulty: 'Advanced',
    popularity: 90, relatedCount: 32, description: "Amazon's cloud platform offering 200+ services from data centers globally.",
    salary: '$115,000 – $175,000', demand: 'Very High', learningTime: '4–8 months',
    prerequisites: ['linux', 'networking'], companies: ['Amazon', 'Netflix', 'Airbnb', 'Pinterest'],
    jobs: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect', 'SRE']
  },
  {
    id: 'tensorflow', name: 'TensorFlow', category: 'AI', icon: '🤖', difficulty: 'Advanced',
    popularity: 83, relatedCount: 16, description: "Google's open-source machine learning framework for building and training ML models.",
    salary: '$130,000 – $200,000', demand: 'Very High', learningTime: '4–8 months',
    prerequisites: ['python', 'numpy'], companies: ['Google', 'Apple', 'Intel', 'Twitter'],
    jobs: ['ML Engineer', 'AI Researcher', 'Data Scientist']
  },
  {
    id: 'redis', name: 'Redis', category: 'Database', icon: '🔴', difficulty: 'Intermediate',
    popularity: 80, relatedCount: 11, description: 'An in-memory data structure store, used as a database, cache, message broker, and queue.',
    salary: '$100,000 – $155,000', demand: 'High', learningTime: '2–4 weeks',
    prerequisites: [], companies: ['Twitter', 'GitHub', 'Snapchat', 'Stack Overflow'],
    jobs: ['Backend Engineer', 'Infrastructure Engineer', 'Full Stack Developer']
  },
]

export const COMPANIES = [
  { id: 'google', name: 'Google', logo: 'G', color: '#4285f4', techs: ['Python', 'Go', 'Kubernetes', 'TensorFlow', 'Angular'], openPositions: 312, hiring: true, description: 'Building products used by billions.' },
  { id: 'microsoft', name: 'Microsoft', logo: 'M', color: '#00a4ef', techs: ['TypeScript', 'C#', 'Azure', 'React', 'Docker'], openPositions: 248, hiring: true, description: 'Empowering every person and organization.' },
  { id: 'amazon', name: 'Amazon', logo: 'A', color: '#ff9900', techs: ['Java', 'AWS', 'Python', 'React', 'Node.js'], openPositions: 425, hiring: true, description: 'The everything store, reimagined.' },
  { id: 'netflix', name: 'Netflix', logo: 'N', color: '#e50914', techs: ['React', 'Node.js', 'AWS', 'Java', 'Python'], openPositions: 87, hiring: true, description: 'Entertainment for the world.' },
  { id: 'meta', name: 'Meta', logo: 'M', color: '#0866ff', techs: ['React', 'GraphQL', 'Hack', 'Python', 'PyTorch'], openPositions: 156, hiring: false, description: 'Building the social graph.' },
  { id: 'stripe', name: 'Stripe', logo: 'S', color: '#635bff', techs: ['Ruby', 'Go', 'React', 'TypeScript', 'PostgreSQL'], openPositions: 63, hiring: true, description: 'Financial infrastructure for the internet.' },
  { id: 'vercel', name: 'Vercel', logo: 'V', color: '#000000', techs: ['Next.js', 'TypeScript', 'Rust', 'Go', 'Redis'], openPositions: 42, hiring: true, description: 'Deploy at the speed of light.' },
  { id: 'shopify', name: 'Shopify', logo: 'S', color: '#96bf48', techs: ['Ruby', 'React', 'GraphQL', 'TypeScript', 'MySQL'], openPositions: 98, hiring: true, description: 'Commerce for everyone.' },
]

export const JOBS = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'Stripe', salaryMin: 145000, salaryMax: 195000, skills: ['React', 'TypeScript', 'GraphQL'], experience: '5+ years', remote: true, type: 'Full-time', posted: '2 days ago' },
  { id: '2', title: 'Full Stack Developer', company: 'Vercel', salaryMin: 120000, salaryMax: 165000, skills: ['Next.js', 'Node.js', 'PostgreSQL'], experience: '3+ years', remote: true, type: 'Full-time', posted: '5 days ago' },
  { id: '3', title: 'ML Engineer', company: 'Google', salaryMin: 160000, salaryMax: 220000, skills: ['Python', 'TensorFlow', 'Kubernetes'], experience: '4+ years', remote: false, type: 'Full-time', posted: '1 week ago' },
  { id: '4', title: 'DevOps Engineer', company: 'Netflix', salaryMin: 130000, salaryMax: 175000, skills: ['Docker', 'Kubernetes', 'AWS'], experience: '4+ years', remote: true, type: 'Full-time', posted: '3 days ago' },
  { id: '5', title: 'React Developer', company: 'Shopify', salaryMin: 100000, salaryMax: 145000, skills: ['React', 'TypeScript', 'GraphQL'], experience: '2+ years', remote: true, type: 'Full-time', posted: '1 day ago' },
  { id: '6', title: 'Backend Engineer', company: 'Meta', salaryMin: 140000, salaryMax: 190000, skills: ['Python', 'GraphQL', 'PostgreSQL'], experience: '4+ years', remote: false, type: 'Full-time', posted: '4 days ago' },
  { id: '7', title: 'Cloud Architect', company: 'Amazon', salaryMin: 155000, salaryMax: 210000, skills: ['AWS', 'Kubernetes', 'Docker'], experience: '6+ years', remote: false, type: 'Full-time', posted: '1 week ago' },
  { id: '8', title: 'TypeScript Engineer', company: 'Microsoft', salaryMin: 125000, salaryMax: 170000, skills: ['TypeScript', 'React', 'Node.js'], experience: '3+ years', remote: true, type: 'Full-time', posted: '6 days ago' },
]

export const GRAPH_NODES = [
  { id: 'react', label: 'React', type: 'skill', x: 400, y: 280, r: 36 },
  { id: 'javascript', label: 'JavaScript', type: 'skill', x: 220, y: 180, r: 30 },
  { id: 'typescript', label: 'TypeScript', type: 'skill', x: 590, y: 170, r: 28 },
  { id: 'nextjs', label: 'Next.js', type: 'skill', x: 580, y: 380, r: 28 },
  { id: 'redux', label: 'Redux', type: 'skill', x: 260, y: 380, r: 24 },
  { id: 'google', label: 'Google', type: 'company', x: 700, y: 270, r: 26 },
  { id: 'netflix', label: 'Netflix', type: 'company', x: 650, y: 450, r: 24 },
  { id: 'meta', label: 'Meta', type: 'company', x: 160, y: 320, r: 24 },
  { id: 'amazon', label: 'Amazon', type: 'company', x: 480, y: 470, r: 24 },
  { id: 'fe_dev', label: 'Frontend Dev', type: 'job', x: 140, y: 440, r: 24 },
  { id: 'fullstack', label: 'Full Stack', type: 'job', x: 330, y: 480, r: 22 },
  { id: 'ui_eng', label: 'UI Engineer', type: 'job', x: 500, y: 140, r: 22 },
]

export const GRAPH_EDGES = [
  ['react', 'javascript'], ['react', 'typescript'], ['react', 'nextjs'], ['react', 'redux'],
  ['react', 'google'], ['react', 'netflix'], ['react', 'meta'], ['react', 'amazon'],
  ['react', 'fe_dev'], ['react', 'fullstack'], ['react', 'ui_eng'],
  ['javascript', 'redux'], ['typescript', 'nextjs'],
]

export const categoryColor = {
  Frontend: 'blue',
  Backend: 'green',
  Cloud: 'purple',
  DevOps: 'orange',
  AI: 'red',
  Database: 'gray',
}

export const difficultyColor = {
  Beginner: 'green',
  Intermediate: 'blue',
  Advanced: 'purple',
}
