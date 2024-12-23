// Importing 'products' from the local database schema located at '@/db/schema'
import { carts, products } from '@/db/schema'
import { cartItemSchema } from '@/lib/validator'

import { z } from 'zod'

// Importing 'InferSelectModel' from the 'drizzle-orm' package
import { InferSelectModel } from 'drizzle-orm'

// Defining a type 'Product' using TypeScript. The type is inferred using the 'InferSelectModel' function
// applied to 'products'. This function generates a type based on the schema definition of 'products',
// allowing TypeScript to enforce correct data types based on the database schema.
export type Product = InferSelectModel<typeof products>

// CART

export type CartItem = z.infer<typeof cartItemSchema>
