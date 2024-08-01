// Importing 'DefaultSession' type from the 'next-auth' package.
import { DefaultSession } from 'next-auth'

// Using TypeScript's declaration merging feature to modify the existing 'Session' interface in 'next-auth' module.
declare module 'next-auth' {
  // Extending the 'Session' interface to include an additional 'role' property inside the 'user' object.
  export interface Session {
    user: {
      role: string // Adding a new property 'role' of type string to the 'user' object.
    } & DefaultSession['user'] // Using TypeScript's intersection type to combine properties from 'user' in 'DefaultSession' with the new 'role' property.
  }
}
