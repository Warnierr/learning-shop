// Import all functionalities from the 'zod' module as alias 'z'
import * as z from 'zod'

// Define schema for user sign-in form
export const signInFormSchema = z.object({
  // 'email' field defined to accept a string, must be a valid email and at least 3 characters long
  email: z.string().email().min(3, 'Email must be at least 3 characters'),
  // 'password' field defined to accept a string, must be at least 3 characters long
  password: z.string().min(3, 'Password must be at least 3 characters'),
})
