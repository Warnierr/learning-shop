// Imports specific icons from 'lucide-react' to be used in the header.
import { ShoppingCart, UserIcon } from 'lucide-react'
// Imports the Image component from Next.js for optimized image handling.
import Image from 'next/image'
// Imports the Link component from Next.js to enable navigation.
import Link from 'next/link'

// Imports the Button component from local UI component library.
import { Button } from '@/components/ui/button'
// Imports a constant value representing the application's name.
import { APP_NAME } from '@/lib/constants'

// Defines the Header functional component.
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          {/* Links to the home page with the application's logo and name. */}
          <Link href="/" className="flex-start">
            <Image
              src="/assets/icons/wakil_logo.svg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            {APP_NAME}
          </Link>
        </div>
        <div className="space-x-2">
          {/* Button wrapping a link to the shopping cart with an icon. */}
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          {/* Button wrapping a link to the sign-in page with an icon. */}
          <Button asChild>
            <Link href="/api/auth/signin">
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

// Exports the Header component for use in other parts of the application.
export default Header
