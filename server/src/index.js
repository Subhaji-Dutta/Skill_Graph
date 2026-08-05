import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { query } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

const allowedOrigins = [
  'http://localhost:8443',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }),
)
app.use(express.json())

// GET /api/skills — all catalog skills, with their relationships flattened into
// the arrays the UI expects (prerequisites/companies/jobs live as edges, not props).
app.get('/api/skills', async (req, res) => {
  try {
    const rows = await query(`
      MATCH (s:Skill {catalog: true})
      OPTIONAL MATCH (s)-[:REQUIRES]->(pre:Skill)
      OPTIONAL MATCH (c:Company)-[:USES]->(s)
      OPTIONAL MATCH (j:Job)-[:REQUIRES]->(s)
      WITH s,
        collect(DISTINCT pre.id)  AS prerequisites,
        collect(DISTINCT c.name)  AS companies,
        collect(DISTINCT j.title) AS jobs
      RETURN s, prerequisites, companies, jobs
      ORDER BY s.name
    `)
    res.json(
      rows.map(({ s, prerequisites, companies, jobs }) => ({
        ...s.properties,
        prerequisites,
        companies,
        jobs,
      })),
    )
  } catch (err) {
    console.error('/api/skills error:', err.message)
    res.status(500).json({ error: 'Failed to fetch skills' })
  }
})

// GET /api/companies — all catalog companies, techs derived from USES edges
app.get('/api/companies', async (req, res) => {
  try {
    const rows = await query(`
      MATCH (c:Company {catalog: true})
      OPTIONAL MATCH (c)-[:USES]->(s:Skill)
      WITH c, collect(DISTINCT s.name) AS techs
      RETURN c, techs
      ORDER BY c.name
    `)
    res.json(rows.map(({ c, techs }) => ({ ...c.properties, techs })))
  } catch (err) {
    console.error('/api/companies error:', err.message)
    res.status(500).json({ error: 'Failed to fetch companies' })
  }
})

// GET /api/jobs — all catalog jobs, skills derived from REQUIRES edges
app.get('/api/jobs', async (req, res) => {
  try {
    const rows = await query(`
      MATCH (j:Job {catalog: true})
      OPTIONAL MATCH (j)-[:REQUIRES]->(s:Skill)
      WITH j, collect(DISTINCT s.name) AS skills
      RETURN j, skills
      ORDER BY j.title
    `)
    res.json(rows.map(({ j, skills }) => ({ ...j.properties, skills })))
  } catch (err) {
    console.error('/api/jobs error:', err.message)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// GET /api/roadmap/:skillId — prerequisite chain for one skill
app.get('/api/roadmap/:skillId', async (req, res) => {
  try {
    const rows = await query(
      `
      MATCH path = (s:Skill {id: $id})-[:REQUIRES*1..5]->(pre:Skill)
      WITH pre, min(length(path)) AS level
      RETURN pre.name AS name, pre.id AS id, level
      ORDER BY level, name
      `,
      { id: req.params.skillId },
    )
    res.json(rows)
  } catch (err) {
    console.error('/api/roadmap error:', err.message)
    res.status(500).json({ error: 'Failed to fetch roadmap' })
  }
})

// GET /api/skill/:skillId/companies — companies using this skill
app.get('/api/skill/:skillId/companies', async (req, res) => {
  try {
    const rows = await query(
      `
      MATCH (c:Company)-[:USES]->(s:Skill {id: $id})
      WHERE c.catalog = true
      RETURN c.name AS name, c.id AS id
      ORDER BY c.name
      `,
      { id: req.params.skillId },
    )
    res.json(rows)
  } catch (err) {
    console.error('/api/skill/companies error:', err.message)
    res.status(500).json({ error: 'Failed to fetch companies' })
  }
})

// GET /api/skill/:skillId/jobs — jobs requiring this skill
app.get('/api/skill/:skillId/jobs', async (req, res) => {
  try {
    const rows = await query(
      `
      MATCH (j:Job)-[:REQUIRES]->(s:Skill {id: $id})
      WHERE j.catalog = true
      RETURN j.title AS title, j.id AS id, j.company AS company
      ORDER BY j.title
      `,
      { id: req.params.skillId },
    )
    res.json(rows)
  } catch (err) {
    console.error('/api/skill/jobs error:', err.message)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// GET /api/graph — nodes and edges for GraphPage
app.get('/api/graph', async (req, res) => {
  try {
    // catalog:true is only ever set on Skill/Company/Job, so no label filter needed.
    const nodeRows = await query(`
      MATCH (n)
      WHERE n.catalog = true
      RETURN
        labels(n)[0] AS type,
        n.id AS id,
        COALESCE(n.name, n.title) AS label
    `)
    const edgeRows = await query(`
      MATCH (a)-[r]->(b)
      WHERE a.catalog = true AND b.catalog = true
      RETURN a.id AS source, b.id AS target, type(r) AS rel
    `)
    res.json({ nodes: nodeRows, edges: edgeRows })
  } catch (err) {
    console.error('/api/graph error:', err.message)
    res.status(500).json({ error: 'Failed to fetch graph' })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Skill Graph API (Node.js + Express + Neo4j)' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
