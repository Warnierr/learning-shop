import { ShoppingCart } from 'lucide-react' // Import the ShoppingCart icon from the 'lucide-react' library.
import Link from 'next/link' // Import the Link component from Next.js for client-side navigation.

import { Badge } from '@/components/ui/badge' // Import the Badge UI component for displaying a small label.
import { Button } from '@/components/ui/button' // Import the Button UI component for styling the button.
import { getMyCart } from '@/lib/actions/cart.actions' // Import the getMyCart function to fetch cart data.

export default async function CartButton() {
  // Define an asynchronous function that renders the cart button.

  const cart = await getMyCart()
  // Fetch the user's cart data using the getMyCart function.

  return (
    <Button asChild variant="ghost">
      {/* Render a Button component with a "ghost" variant and "asChild" prop to pass its functionality to a child element. */}
      <Link href="/cart">
        {/* Use Next.js Link for navigation to the /cart page. */}
        <ShoppingCart className="mr-1" />
        {/* Display the ShoppingCart icon with a right margin for spacing. */}
        Cart
        {/* Label the button as "Cart". */}
        {cart && cart.items.length > 0 && (
          // If the cart exists and contains items, display the Badge component.
          <Badge className="ml-1">
            {/* Add a left margin to the Badge for spacing. */}
            {cart.items.reduce((a, c) => a + c.qty, 0)}
            {/* Calculate and display the total quantity of items in the cart by summing up the 'qty' field of all items. */}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
