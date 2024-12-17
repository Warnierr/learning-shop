'use server'

// Importing necessary modules and utilities
import { auth } from '@/auth'
import db from '@/db/drizzle'
import { carts, products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { cartItemSchema } from '../validator'
import { formatError, round2 } from '../utils'
import { CartItem } from '@/types'
import { revalidatePath } from 'next/cache'

// Function to calculate the price breakdown (items, shipping, tax, total)
const calcPrice = (items: CartItem[]) => {
  // Calculate the total price of items in the cart
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    // Determine shipping price (free if itemsPrice > $100)
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    // Calculate tax as 15% of the items price
    taxPrice = round2(0.15 * itemsPrice),
    // Calculate the final total price
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

// Function to add an item to the cart
export const addItemToCart = async (data: CartItem) => {
  try {
    // Get the session cart ID from cookies
    const sessionCartId = cookies().get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('Cart Session not found')

    // Authenticate the user
    const session = await auth()
    const userId = session?.user.id as string | undefined

    // Retrieve the user's current cart
    const cart = await getMyCart()

    // Validate the cart item data using a schema
    const item = cartItemSchema.parse(data)

    // Check if the product exists in the database
    const product = await db.query.products.findFirst({
      where: eq(products.id, item.productId),
    })
    if (!product) throw new Error('Product not found')

    // If there is no existing cart, create a new one
    if (!cart) {
      if (product.stock < 1) throw new Error('Not enough stock')

      // Insert the new cart into the database
      await db.insert(carts).values({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]), // Calculate price details for the new cart
      })

      // Revalidate the cache for the product's page
      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: 'Item added to cart successfully',
      }
    } else {
      // Check if the item already exists in the cart
      const existItem = cart.items.find((x) => x.productId === item.productId)
      if (existItem) {
        // If item exists, check stock and update quantity
        if (product.stock < existItem.qty + 1)
          throw new Error('Not enough stock')
        cart.items.find((x) => x.productId === item.productId)!.qty =
          existItem.qty + 1
      } else {
        // If item does not exist, ensure enough stock and add it
        if (product.stock < 1) throw new Error('Not enough stock')
        cart.items.push(item)
      }

      // Update the cart in the database with the new items and price details
      await db
        .update(carts)
        .set({
          items: cart.items,
          ...calcPrice(cart.items),
        })
        .where(eq(carts.id, cart.id))

      // Revalidate the cache for the product's page
      revalidatePath(`/product/${product.slug}`)
      return {
        success: true,
        message: `${product.name} ${
          existItem ? 'updated in' : 'added to'
        } cart successfully`,
      }
    }
  } catch (error) {
    // Handle errors and return a formatted error message
    return { success: false, message: formatError(error) }
  }
}

// Function to retrieve the user's cart from the database
export async function getMyCart() {
  const sessionCartId = cookies().get('sessionCartId')?.value
  if (!sessionCartId) return undefined

  // Authenticate the user and determine the user ID
  const session = await auth()
  const userId = session?.user.id

  // Query the database for the user's cart or the session cart
  const cart = await db.query.carts.findFirst({
    where: userId
      ? eq(carts.userId, userId)
      : eq(carts.sessionCartId, sessionCartId),
  })
  return cart
}

// Function to remove an item from the cart (placeholder)
export const removeItemFromCart = async (productId: string) => {
  // TODO: Implement the removal logic
  return { success: true, message: `${productId} removed` }
}
