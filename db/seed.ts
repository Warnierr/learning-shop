// Imports the 'cwd' (current working directory) function from the Node.js process module.
import { cwd } from 'node:process'
// Imports the Next.js utility for loading environment configuration.
import { loadEnvConfig } from '@next/env'

// Imports the 'drizzle' function specifically configured for Node.js PostgreSQL environments.
import { drizzle } from 'drizzle-orm/node-postgres'
// Imports the PostgreSQL client from the 'pg' package.
import { Client } from 'pg'

// Imports the database schema definitions.
import * as schema from './schema'
// Imports predefined sample data for seeding.
import sampleData from '@/lib/sample-data'

// Loads environment variables from the .env file located at the current working directory.
loadEnvConfig(cwd())

// Main asynchronous function to handle database seeding.
const main = async () => {
  try {
    // Initializes a new PostgreSQL client using the connection string from environment variables.
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
    })
    // Connects to the PostgreSQL database.
    await client.connect()

    // Initializes the drizzle ORM with the connected client.
    const db = drizzle(client)

    // Deletes existing entries from the 'products' table to ensure a clean state before seeding.
    await db.delete(schema.products)

    // Inserts new products into the 'products' table using the sample data and returns the inserted data.
    const resProducts = await db
      .insert(schema.products)
      .values(sampleData.products)
      .returning()
    // Logs the result of the product insertions to the console.
    console.log({ resProducts })

    // Closes the database connection.
    await client.end()
  } catch (error) {
    // Logs any errors encountered during the seeding process.
    console.error(error)
    // Throws a new error to indicate that the database seeding failed.
    throw new Error('Failed to seed database')
  }
}

// Executes the main function.
main()
