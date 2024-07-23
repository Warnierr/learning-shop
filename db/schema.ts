// Imports various data type definitions and functions from 'drizzle-orm/pg-core' for PostgreSQL table and column management.
import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

// Defines the database schema for the 'products' table.
export const products = pgTable(
  'product', // The name of the table in the database.
  {
    // Defines the columns of the table and their specific types and constraints:
    id: uuid('id').defaultRandom().primaryKey().notNull(), // UUID for the product ID, automatically generated.
    name: text('name').notNull(), // Name of the product, cannot be null.
    slug: text('slug').notNull(), // A URL-friendly identifier for the product, cannot be null.
    category: text('category').notNull(), // Category to which the product belongs, cannot be null.
    images: text('images').array().notNull(), // An array of image URLs, cannot be null.
    brand: text('brand').notNull(), // Brand of the product, cannot be null.
    description: text('description').notNull(), // Description of the product, cannot be null.
    stock: integer('stock').notNull(), // Stock quantity, cannot be null.
    price: numeric('price', { precision: 12, scale: 2 }).notNull().default('0'), // Price of the product with a default value.
    rating: numeric('rating', { precision: 3, scale: 2 })
      .notNull()
      .default('0'), // Average rating of the product.
    numReviews: integer('numReviews').notNull().default(0), // Number of reviews, with a default of 0.
    isFeatured: boolean('isFeatured').default(false).notNull(), // Boolean to indicate if the product is featured.
    banner: text('banner'), // Optional text field for a promotional banner.
    createdAt: timestamp('createdAt').defaultNow().notNull(), // Timestamp for when the product was created.
  },
  (table) => {
    // Additional configuration for the table.
    return {
      productSlugIdx: uniqueIndex('product_slug_idx').on(table.slug), // Creates a unique index on the 'slug' column for quick lookup.
    }
  }
)
