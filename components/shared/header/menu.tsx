import UserButton from './user-button' // Import the UserButton component
import CartButton from './cart-button'

const Menu = () => {
  return (
    <>
      {/* Container to hold the navigation elements, aligned to the right with a gap between them */}
      <div className="flex justify-end gap-3">
        {/* Navigation bar, visible on medium screens and above (hidden on smaller screens) */}
        <nav className="md:flex hidden w-full max-w-xs gap-1">
          {/* Button component that acts as a link to the cart page */}
          <CartButton />
          <UserButton />{' '}
          {/* Component for user-related actions, like login or profile */}
        </nav>
      </div>
    </>
  )
}

export default Menu // Export the Menu component as the default export
