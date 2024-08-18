import { ShoppingCart } from 'lucide-react' // Import the ShoppingCart icon from the 'lucide-react' library

import UserButton from './user-button' // Import the UserButton component
import { Button } from '@/components/ui/button' // Import the Button component from the UI library
import Link from 'next/link' // Import the Link component from Next.js for client-side navigation

const Menu = () => {
  return (
    <>
      {/* Container to hold the navigation elements, aligned to the right with a gap between them */}
      <div className="flex justify-end gap-3">
        {/* Navigation bar, visible on medium screens and above (hidden on smaller screens) */}
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          {/* Button component that acts as a link to the cart page */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart /> {/* Shopping cart icon */}
              Cart {/* Text label for the cart */}
            </Link>
          </Button>
          <UserButton />{' '}
          {/* Component for user-related actions, like login or profile */}
        </nav>
      </div>
    </>
  )
}

export default Menu // Export the Menu component as the default export
