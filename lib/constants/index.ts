// Importing the 'email' function from the 'next-auth/providers/email' module
import email from 'next-auth/providers/email'

// Setting the constant APP_NAME to the value of the environment variable 'NEXT_PUBLIC_APP_NAME'
// If the environment variable is not set, the default value 'Wakil Shop' is used
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Wakil Shop'

// Setting the constant APP_DESCRIPTION to the value of the environment variable 'NEXT_PUBLIC_APP_DEXCRIPTION'
// If the environment variable is not set, the default value is a description of the platform
// which is built with Next.js, Postgres, and Shadcn (possibly a typo or a specific framework/technology)
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DEXCRIPTION ||
  'An e-commerce platform built with Next.js, Postgres, Shadcn'

// Defining default values for the signIn process with an object containing two fields: email and password
// Both fields are initialized as empty strings
export const signInDefaultValues = {
  email: '',
  password: '',
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}
