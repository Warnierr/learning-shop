// Use the server-side functionality
'use server'

// Import necessary functions from Next.js and authentication libraries
import { isRedirectError } from 'next/dist/client/components/redirect'
import { signIn, signOut } from '@/auth'
import { signInFormSchema } from '../validator'

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
