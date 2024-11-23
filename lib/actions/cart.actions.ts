'use server'

import { auth } from '@/auth'
import db from '@/db/drizzle'
import { carts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function getMyCard() {
  const sessionCartId = cookies().get('sessionCartId')?.value
  if (!sessionCartId) return undefined
  const session = await auth()
  const userId = session?.user.id
  const cart = await db.query.carts.findFirst({
    where: userId
      ? eq(carts.userId, userId)
      : eq(carts.sessionCartId, sessionCartId),
  })
}
