// Directive to ensure this script runs on the server side.
'use server'

// Imports the 'desc' function from 'drizzle-orm' for sorting in descending order.
import { desc } from 'drizzle-orm'

// Imports the database configuration from a specific path in the project.
import db from '@/db/drizzle'

// Imports the 'products' schema from the project's database schema definitions.
import { products } from '@/db/schema'

// Imports the 'eq' function for equality conditions in SQL queries from 'drizzle-orm'.
import { eq } from 'drizzle-orm/sql'

/**
 * Asynchronously fetches the latest products from the database.
 * Returns an array of product records sorted by creation date in descending order,
 * limited to the first 4 entries.
 */
export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    orderBy: [desc(products.createdAt)], // Sorts the results by 'createdAt' in descending order.
    limit: 4, // Limits the output to 4 products.
  })
  return data // Returns the fetched products.
}

/**
 * Asynchronously retrieves a specific product by its slug.
 * If a product with the matching slug is found, it returns the first such entry.
 */
export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug), // Filters to find a product where its 'slug' matches the provided slug.
  })
}
