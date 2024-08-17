// Imports the Image component from Next.js for optimized image handling.
import Image from 'next/image'
// Imports the Link component from Next.js to enable navigation.
import Link from 'next/link'

// Imports the Button component from local UI component library.
import { Button } from '@/components/ui/button'
// Imports a constant value representing the application's name.
import { APP_NAME } from '@/lib/constants'
import Menu from './menu'

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
        <Menu />
      </div>
    </header>
  )
}

// Exports the Header component for use in other parts of the application.
export default Header
