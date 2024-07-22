'use server' // Directive to use this script on the server side.

// Importing the 'desc' function from 'drizzle-orm' for descending order sorting.
import { desc } from 'drizzle-orm'

// Importing the database configuration from a specific location in the project.
import db from '@/db/drizzle'

// Importing the 'products' schema from the database schema definitions.
import { products } from '@/db/schema'

// Importing the 'eq' function for equality comparison in SQL queries from 'drizzle-orm'.
import { eq } from 'drizzle-orm/sql'

// Asynchronous function to get the latest products.
export async function getLatestProducts() {
  // Querying the database to find multiple products.
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)], // Orders the results by 'createdAt' in descending order.
    limit: 4, // Limits the results to the first 4 products.
  })
  return data // Returns the fetched data.
}

// Asynchronous function to get a product by its slug.
export async function getProductBySlug(slug: string) {
  // Querying the database to find the first product matching the given slug.
  return await db.query.products.findFirst({
    where: eq(products.slug, slug), // Where condition checks if the product's slug equals the provided slug.
  })
}
