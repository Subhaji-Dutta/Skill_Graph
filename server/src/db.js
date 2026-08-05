import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(here, '..', '.env') })

// NB: these are deliberately NEO4J_-prefixed. A bare `USERNAME` key is shadowed
// by the built-in Windows env var of the same name, which dotenv won't override
// — that silently authenticates as the OS user and fails.
const { NEO4J_URI: URI, NEO4J_USERNAME: USERNAME, NEO4J_PASSWORD: PASSWORD } = process.env

if (!URI || !USERNAME || !PASSWORD) {
  throw new Error(
    'Missing cognoDB env vars. server/.env needs NEO4J_URI, NEO4J_USERNAME and NEO4J_PASSWORD.',
  )
}

// disableLosslessIntegers: without it every number comes back as a Neo4j
// Integer object and JSON-serializes to {low, high}, which the UI can't render.
export const driver = neo4j.driver(URI, neo4j.auth.basic(USERNAME, PASSWORD), {
  disableLosslessIntegers: true,
})

/** Run a read query and return plain JS objects. */
export async function query(cypher, params = {}) {
  const session = driver.session()
  try {
    const result = await session.run(cypher, params)
    return result.records.map((r) => r.toObject())
  } finally {
    await session.close()
  }
}

/** Run a write query, discarding the result. */
export async function write(cypher, params = {}) {
  const session = driver.session()
  try {
    await session.run(cypher, params)
  } finally {
    await session.close()
  }
}
