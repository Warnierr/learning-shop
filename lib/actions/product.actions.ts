// Directive to ensure this script runs on the server side.
'use server'

// Imports the 'desc' function from 'drizzle-orm' for sorting in descending order.
import { desc } from 'drizzle-orm'

// Imports a pre-configured database instance from a specific path within the project.
import db from '@/db/drizzle'

// Imports the product schema from the database schema definitions.
import { products } from '@/db/schema'

// Imports the 'eq' function for creating equality conditions in SQL queries from 'drizzle-orm'.
import { eq } from 'drizzle-orm/sql'

/**
 * Asynchronously fetches the latest products from the database.
 * @returns An array of product records sorted by creation date in descending order,
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
 * @param slug - The slug of the product to retrieve.
 * @returns A product object if a matching slug is found.
 */
export async function getProductBySlug(slug: string) {
  return await db.query.products.findFirst({
    where: eq(products.slug, slug), // Filters to find a product where its 'slug' matches the provided slug.
  })
}
