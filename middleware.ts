// Exporting 'auth' from '@/auth' under the alias 'middleware'.
// This allows other modules to import 'middleware' directly, which is actually the 'auth' export from '@/auth'.
export { auth as middleware } from '@/auth'

// Defining and exporting a constant 'config'. This configuration object contains a single property 'matcher'.
export const config = {
  // The 'matcher' property specifies an array of path patterns that this configuration should apply to.
  // The regex pattern used here is designed to exclude certain paths such as API routes, Next.js specific
  // static assets, images, assets directories, and the favicon.ico file from matching.
  // Specifically, it matches any path that does not include the specified directories and files.
  matcher: ['/((?!api|_next/static|_next/image|_next/assets|favicon.ico).*)'],
}
