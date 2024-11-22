// Importing a specific adapter for Drizzle from a custom library or module.
import { DrizzleAdapter } from '@auth/drizzle-adapter'
// Importing the 'compareSync' function from the 'bcrypt-ts-edge' library to compare hashed passwords.
import { compareSync } from 'bcrypt-ts-edge'
// Importing the equality function 'eq' from 'drizzle-orm' to facilitate query construction.
import { eq } from 'drizzle-orm'
// Importing type for Next.js authentication configuration.
import type { NextAuthConfig } from 'next-auth'
// Importing the core function from 'next-auth' for authentication handling in Next.js.
import NextAuth from 'next-auth'
// Importing the CredentialsProvider from 'next-auth' to use username and password authentication.
import CredentialsProvider from 'next-auth/providers/credentials'

// Importing database instance configured with Drizzle ORM.
import db from './db/drizzle'
// Importing the users table schema from the database schema file.
import { carts, users } from './db/schema'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Exporting the configuration object for NextAuth, defining various properties.
export const config = {
  pages: {
    signIn: '/sign-in', // Custom sign-in page path.
    error: '/sign-in', // Custom error page path redirected to sign-in.
  },
  session: {
    strategy: 'jwt', // Using JSON Web Tokens for session management.
    maxAge: 30 * 24 * 60 * 60, // Setting the session expiration time to 30 days.
  },
  adapter: DrizzleAdapter(db), // Using the custom Drizzle adapter for database interactions.
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' }, // Defining 'email' as a required credential.
        password: { type: 'password' }, // Defining 'password' as a required credential.
      },
      // Function to authorize users based on credentials provided.
      async authorize(credentials) {
        // Return null if no credentials are provided.
        if (credentials == null) return null

        // Querying the first user with a matching email.
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email as string),
        })
        // Checking if the user exists and the password matches.
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            // Returning user details if the password is correct.
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (user) {
        if (trigger === 'signIn' || trigger === 'signUp') {
          const sessionCartId = cookies().get('sessionCartId')?.value
          if (!sessionCartId) throw new Error('Session Cart Not Found')
          const sessionCartExists = await db.query.carts.findFirst({
            where: eq(carts.sessionCartId, sessionCartId),
          })
          if (sessionCartExists && !sessionCartExists.userId) {
            const userCartExists = await db.query.carts.findFirst({
              where: eq(carts.userId, user.id),
            })
            if (userCartExists) {
              cookies().set('beforeSigninSessionCartId', sessionCartId)
              cookies().set('sessionCartId', userCartExists.sessionCartId)
            } else {
              db.update(carts)
                .set({ userId: user.id })
                .where(eq(carts.id, sessionCartExists.id))
            }
          }
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    // Callback function to update session data.
    session: async ({ session, user, trigger, token }: any) => {
      session.user.id = token.sub // Assigning the user ID from the JWT token.
      if (trigger === 'update') {
        // Updating the user name on session update.
        session.user.name = user.name
      }
      return session
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false
      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID()
        const newRequestHeaders = new Headers(request.headers)
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        })
        response.cookies.set('sessionCartId', sessionCartId)
        return response
      } else {
        return true
      }
    },
  },
} satisfies NextAuthConfig // Ensuring the config object conforms to the NextAuthConfig type.
// Destructuring and exporting functions from the configured NextAuth instance.
export const { handlers, auth, signIn, signOut } = NextAuth(config)
