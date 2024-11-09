// Importing necessary modules and components from external libraries and local components
import Link from 'next/link' // for navigation links in Next.js
import { useSearchParams } from 'next/navigation' // for working with URL search parameters
import { useFormState, useFormStatus } from 'react-dom' // hooks for managing form state and submission status
import { Button } from '@/components/ui/button' // custom Button component
import { Input } from '@/components/ui/input' // custom Input component
import { Label } from '@/components/ui/label' // custom Label component
import { signUp } from '@/lib/actions/user.actions' // sign-up action for handling user registration
import { signUpDefaultValues } from '@/lib/constants' // default values for the sign-up form

// Main SignUpForm component definition
export default function SignUpForm() {
  // Initializing form state with default values, including a success flag and message for feedback
  const [data, action] = useFormState(signUp, {
    success: false,
    message: '',
  })

  // Retrieve URL search parameters, with a fallback for callbackUrl
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  // Define the SignUpButton component, responsible for showing a submit button
  const SignUpButton = () => {
    const { pending } = useFormStatus() // Track if the form is pending submission
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'Submitting...' : 'Sign Up'} // Show "Submitting..." text if
        the form is pending
      </Button>
    )
  }

  // Return the form JSX, structured with inputs, labels, and the sign-up button
  return (
    <form action={action}>
      {' '}
      {/* Form submission action */}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />{' '}
      {/* Hidden field for callback URL */}
      <div className="space-y-6">
        {' '}
        {/* Main form container with spacing */}
        <div>
          <Label htmlFor="name">Name</Label> {/* Label for name field */}
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            type="text"
            defaultValue={signUpDefaultValues.name} // Set default value from constants
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label> {/* Label for email field */}
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            required
            type="email"
            defaultValue={signUpDefaultValues.email} // Set default value from constants
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>{' '}
          {/* Label for password field */}
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signUpDefaultValues.password} // Set default value from constants
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>{' '}
          {/* Label for confirm password field */}
          <Input
            id="confirmPassword"
            name="confirmPassword"
            required
            type="password"
            defaultValue={signUpDefaultValues.confirmPassword} // Set default value from constants
          />
        </div>
        <div>
          <SignUpButton /> {/* Render the SignUpButton component */}
        </div>
        {/* Display an error message if the form submission fails */}
        {!data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        {/* Provide a link to the Sign-In page if the user already has an account */}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link
            target="_self"
            className="link"
            href={`/sign-in?callbackUrl=${callbackUrl}`} // Link to the sign-in page with callback URL
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  )
}
