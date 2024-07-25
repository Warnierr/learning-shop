import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Product } from '@/types'
import ProductPrice from './product-price'

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          {/* Renders the product image using Next.js's Image for optimized loading. */}
          <Image
            alt={product.name} /* Provides an alt text for accessibility. */
            className="aspect-square object-cover rounded" /* Applies styling to make the image square and rounded. */
            height={300} /* Sets a fixed height for consistency. */
            src={
              product.images![0]
            } /* Uses the first image from the product's image array. */
            width={300} /* Sets a fixed width to match the height. */
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div>
          {/* Displays the product brand. */}
          <p className="text-xs">{product.brand}</p>
        </div>
        <div>
          {/* Product name is wrapped in a Link for easy navigation to its details. */}
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-sm font-medium">{product.name}</h2>
          </Link>
        </div>
        <div className="flex-between gap-4">
          {/* Displays the product rating. */}
          <p>{product.rating} stars</p>
          {/* Conditionally displays the price or an out-of-stock message. */}
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">
              Out of Stock
            </p> /* Shows out-of-stock status. */
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
