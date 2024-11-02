// Use the server-side functionality
'use server'

// Import necessary functions from Next.js and authentication libraries
import { isRedirectError } from 'next/dist/client/components/redirect'
import { signIn, signOut } from '@/auth'
import { signInFormSchema, signUpFormSchema } from '../validator'
import { formatError } from '../utils'
import { hashSync } from 'bcrypt-ts-edge'
import db from '@/db/drizzle'
import { users } from '@/db/schema'

// USER
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })
    const values = {
      id: crypto.randomUUID(),
      ...user,
      password: hashSync(user.password, 10),
    }
    await db.insert(users).values(values)
    await signIn('credentials', {
      email: user.email,
      password: user.password,
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return {
      success: false,
      message: formatError(error).includes(
        'duplicate key value violates unique constraint "user_email_idx"'
      )
        ? 'Email is already exist'
        : formatError(error),
    }
  }
}

// Define an asynchronous function to handle user sign-in with credentials
export async function signInWithCredentials(
  prevState: unknown, // Store previous state, though it's not used here
  formData: FormData // Form data from the client
) {
  try {
    // Parse and validate the user's input using the predefined schema
    const user = signInFormSchema.parse({
      email: formData.get('email'), // Retrieve email from form data
      password: formData.get('password'), // Retrieve password from form data
    })
    // Sign in the user using the validated credentials
    await signIn('credentials', user)
    // Return success message if sign in is successful
    return { success: true, message: 'Sign in successfully' }
  } catch (error) {
    // Check if the error is a redirect error and throw it if so
    if (isRedirectError(error)) {
      throw error
    }
    // Return failure message if validation fails or other errors occur
    return { success: false, message: 'Invalid email or password' }
  }
}

// Define an asynchronous function to handle user sign-out
export const SignOut = async () => {
  // Perform sign out action
  await signOut()
}
