import email from 'next-auth/providers/email'

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Wakil Shop'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DEXCRIPTION ||
  'An e-commerce platform built with Next.js, Postgres, Shadcn'

export const signnInDefaultValues = {
  email: '',
  password: '',
}
