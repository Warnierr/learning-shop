// Imports the Product type defined elsewhere in the project for strong typing.
import { Product } from '@/types'

// Imports the ProductCard component which is responsible for displaying individual product details.
import ProductCard from './product-card'

// Defines a functional component named ProductList that takes a title and an array of Product objects as props.
const ProductList = ({ title, data }: { title: string; data: Product[] }) => {
  // Conditional rendering to manage the display of the product list.
  return (
    <>
      <h2 className="h2-bold">{title}</h2>
      {data.length > 0 ? (
        /* Displays the products in a responsive grid that adjusts the number of columns based on the screen size. */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        /* Displays a message if no products are found. */
        <div>
          <p>No product found</p>
        </div>
      )}
    </>
  )
}

// Exports the ProductList component for use in other parts of the application.
export default ProductList
