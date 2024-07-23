// Imports the 'cwd' function from the 'node:process' module to get the current working directory.
import { cwd } from 'node:process'
// Imports the 'loadEnvConfig' function from '@next/env' to load environment variables from the .env file.
import { loadEnvConfig } from '@next/env'

// Calls 'loadEnvConfig' with the current working directory to ensure environment variables are loaded before the rest of the script runs.
loadEnvConfig(cwd())

// Imports the 'defineConfig' function from 'drizzle-kit' to define configuration options for the ORM.
import { defineConfig } from 'drizzle-kit'

// Defines and exports the configuration for 'drizzle-kit'.
export default defineConfig({
  dialect: 'postgresql', // Specifies the database dialect to use; in this case, PostgreSQL.
  schema: './db/schema.ts', // Points to the file where the database schema is defined.
  out: './drizzle', // Specifies the output directory for generated files.
  dbCredentials: {
    url: process.env.POSTGRES_URL!, // Uses the PostgreSQL connection string from the environment variables.
  },
})
