'use server' // Indicates that this code will be executed on the server-side.

// Import necessary modules and utilities.
import { auth } from '@/auth' // Imports the authentication module to manage user sessions.
import db from '@/db/drizzle' // Imports the database configuration and connection using Drizzle ORM.
import { carts } from '@/db/schema' // Imports the 'carts' schema from the database schema definitions.
import { eq } from 'drizzle-orm' // Imports a utility for equality checks in database queries.
import { cookies } from 'next/headers' // Imports the cookies utility for handling HTTP cookies in Next.js.

// Asynchronous function to retrieve the current user's cart or session-based cart.
export async function getMyCard() {
  // Retrieve the 'sessionCartId' cookie value, if available.
  const sessionCartId = cookies().get('sessionCartId')?.value

  // If no 'sessionCartId' is found in the cookies, return 'undefined'.
  if (!sessionCartId) return undefined

  // Fetch the current user's session details using the 'auth' function.
  const session = await auth()

  // Extract the user ID from the session, if available.
  const userId = session?.user.id

  // Query the database to find the user's cart:
  // - If a user ID is present, find the cart associated with that user.
  // - Otherwise, find the cart associated with the 'sessionCartId'.
  const cart = await db.query.carts.findFirst({
    where: userId
      ? eq(carts.userId, userId) // Match the cart with the user ID.
      : eq(carts.sessionCartId, sessionCartId), // Match the cart with the sessionCartId.
  })

  // (Currently, the function does not return the 'cart' or handle further logic.)
}
