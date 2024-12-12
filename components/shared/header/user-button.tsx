import Link from 'next/link' // Import the Link component from Next.js for navigation
import { auth } from '@/auth' // Import the authentication function
import { Button } from '@/components/ui/button' // Import a Button component from the UI library
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu' // Import dropdown menu components from the UI library
import { SignOut } from '@/lib/actions/user.actions' // Import the SignOut action

// Define the main component for the user button
export default async function UserButton() {
  // Await authentication to check if the user is signed in
  const session = await auth()

  // If no user session exists, show a "Sign In" button
  if (!session)
    return (
      <Link href="/api/auth/signin">
        {' '}
        {/* Link to the sign-in page */}
        <Button>Sign In</Button> {/* Button for signing in */}
      </Link>
    )

  // If a session exists, display the user button and dropdown menu
  return (
    <div className="flex gap-2 items-center">
      {' '}
      {/* Container for the button and dropdown */}
      <DropdownMenu>
        {' '}
        {/* Dropdown menu wrapper */}
        <DropdownMenuTrigger asChild>
          {' '}
          {/* Trigger for the dropdown menu */}
          <div className="flex items-center">
            <Button
              variant="ghost" // Use a ghost-style button (transparent)
              className="relative w-8 h-8 rounded-full ml-2" // Styling for the button
            >
              {session.user.name} {/* Display the user's name */}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {' '}
          {/* Content of the dropdown */}
          <DropdownMenuLabel className="font-normal">
            {' '}
            {/* Dropdown label */}
            <div className="flex flex-col space-y-1">
              {' '}
              {/* Container for user info */}
              <p className="text-sm font-medium leading-none">
                {session.user.name} {/* Display the user's name */}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email} {/* Display the user's email */}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-0 mb-1">
            {' '}
            {/* Dropdown item for signing out */}
            <form action={SignOut} className="w-full">
              {' '}
              {/* Form to trigger the SignOut action */}
              <Button
                className="w-full py-4 px-2 h-4 justify-start" // Styling for the button
                variant="ghost" // Ghost-style button
              >
                Sign Out {/* Button text */}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
