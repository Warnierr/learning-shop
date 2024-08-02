// Import the ProductList component from the shared product components directory
import ProductList from '@/components/shared/product/product-list'
// Import the getLatestProducts function from the product actions library
import { getLatestProducts } from '@/lib/actions/product.actions'

// Define the Home function as an asynchronous function
export default async function Home() {
  // Await the response from getLatestProducts to fetch the latest products data
  const latestProducts = await getLatestProducts()
  // Return the JSX layout
  return (
    // Define a div container with spacing on the y-axis
    <div className="space-y-8">
      {/* Render the ProductList component with the title "Newest Arrivals" and pass the latestProducts data */}
      <ProductList title="Newest Arrivals" data={latestProducts} />
    </div>
  )
}
