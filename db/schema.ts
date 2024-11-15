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

import { primaryKey } from 'drizzle-orm/pg-core/primary-keys'
import { AdapterAccountType } from 'next-auth/adapters'

// USERS
export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: text('name'),
  email: text('email').notNull(),
  role: text('role').notNull().default('user'),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
})

// ACCOUNTS
// Defines the table structure for user accounts, managing various authentication providers.
export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

// SESSIONS
// Table to manage sessions for authenticated users, linking back to the user table.
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

// VERIFICATION TOKENS
// Defines a table for storing verification tokens for email or other authentication methods.
export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

// PRODUCTS
// Defines the database schema for the 'products' table with various product details.
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

// CARTS
export const carts = pgTable('cart', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  userId: uuid('userId').references(() => users.id, {
    onDelete: 'cascade',
  }),
  sessionCartId: text('sessionCartId').notNull(),
  items: json('items').$type<CartItem[]>().notNull().default([]),
  itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
