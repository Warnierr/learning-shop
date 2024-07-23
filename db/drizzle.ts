// Imports all exports from the schema file as a module 'schema'.
import * as schema from './schema'

// Imports the 'drizzle' function from 'drizzle-orm/vercel-postgres', designed for PostgreSQL database management.
import { drizzle } from 'drizzle-orm/vercel-postgres'
// Imports the 'sql' tag function from '@vercel/postgres' for constructing SQL queries safely.
import { sql } from '@vercel/postgres'

// Configures and initializes the database instance with the specified schema and SQL utility.
const db = drizzle(sql, {
  schema,
})
// Exports the configured database instance for use throughout the application.
export default db
