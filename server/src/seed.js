/**
 * Seeds cognoDB with the skill graph.
 *
 * Node model (ported from the original Python seed, widened to carry the
 * fields the UI renders):
 *   (:Skill)-[:REQUIRES]->(:Skill)     prerequisites
 *   (:Company)-[:USES]->(:Skill)
 *   (:Job)-[:REQUIRES]->(:Skill)
 *   (:Job)-[:AT]->(:Company)
 *
 * Skills/companies that are only ever referenced (Linux, Go, Spotify, ...) are
 * merged in as stubs with catalog:false so every edge resolves. The API only
 * serves catalog:true nodes, so the UI never renders a half-empty card.
 */
import { driver, write } from './db.js'
import { SKILLS, COMPANIES, JOBS } from './data.js'

async function seed() {
  await write('MATCH (n) DETACH DELETE n')
  console.log('Old graph deleted.')

  await write('CREATE CONSTRAINT skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE')
  await write('CREATE CONSTRAINT company_name IF NOT EXISTS FOR (c:Company) REQUIRE c.name IS UNIQUE')

  await write(
    `UNWIND $skills AS s
     MERGE (n:Skill {id: s.id})
     SET n += s, n.catalog = true`,
    { skills: SKILLS.map(({ prerequisites, companies, jobs, ...rest }) => rest) },
  )
  console.log(`Skills inserted (${SKILLS.length}).`)

  await write(
    `UNWIND $companies AS c
     MERGE (n:Company {name: c.name})
     SET n += c, n.catalog = true`,
    { companies: COMPANIES.map(({ techs, ...rest }) => rest) },
  )
  console.log(`Companies inserted (${COMPANIES.length}).`)

  await write(
    `UNWIND $jobs AS j
     MERGE (n:Job {id: j.id})
     SET n += j, n.catalog = true`,
    { jobs: JOBS.map(({ skills, ...rest }) => rest) },
  )
  console.log(`Jobs inserted (${JOBS.length}).`)

  // Prerequisites are referenced by *id* (not name), so match on id — matching
  // on name here silently forks a duplicate stub node per prerequisite.
  const prereqs = SKILLS.flatMap((s) => s.prerequisites.map((p) => ({ child: s.id, parent: p })))
  await write(
    `UNWIND $pairs AS p
     MATCH (child:Skill {id: p.child})
     MERGE (parent:Skill {id: p.parent})
       ON CREATE SET parent.name = p.parent, parent.catalog = false
     MERGE (child)-[:REQUIRES]->(parent)`,
    { pairs: prereqs },
  )
  console.log(`Prerequisite edges created (${prereqs.length}).`)

  // Company -> Skill, unioned from both directions: company.techs and
  // skill.companies disagree in places, so we trust both. These reference
  // skills by display name; stubs get a slugged id so the id constraint holds.
  const uses = [
    ...COMPANIES.flatMap((c) => c.techs.map((t) => ({ company: c.name, skill: t }))),
    ...SKILLS.flatMap((s) => s.companies.map((c) => ({ company: c, skill: s.name }))),
  ]
  await write(
    `UNWIND $pairs AS p
     MERGE (c:Company {name: p.company})
       ON CREATE SET c.id = toLower(p.company), c.catalog = false
     MERGE (s:Skill {name: p.skill})
       ON CREATE SET s.id = toLower(replace(replace(p.skill, ' ', '-'), '.', '')), s.catalog = false
     MERGE (c)-[:USES]->(s)`,
    { pairs: uses },
  )
  console.log(`Company→Skill edges created (${uses.length}).`)

  const jobSkills = JOBS.flatMap((j) => j.skills.map((s) => ({ job: j.id, skill: s })))
  await write(
    `UNWIND $pairs AS p
     MATCH (j:Job {id: p.job})
     MERGE (s:Skill {name: p.skill})
       ON CREATE SET s.id = toLower(replace(replace(p.skill, ' ', '-'), '.', '')), s.catalog = false
     MERGE (j)-[:REQUIRES]->(s)`,
    { pairs: jobSkills },
  )
  console.log(`Job→Skill edges created (${jobSkills.length}).`)

  await write(
    `UNWIND $jobs AS j
     MATCH (job:Job {id: j.id})
     MERGE (c:Company {name: j.company})
       ON CREATE SET c.id = toLower(j.company), c.catalog = false
     MERGE (job)-[:AT]->(c)`,
    { jobs: JOBS.map((j) => ({ id: j.id, company: j.company })) },
  )
  console.log('Job→Company edges created.')

  console.log('\nDatabase seeded successfully!')
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => driver.close())
