// Import the Footer component from the shared components directory
import Footer from '@/components/shared/footer'
// Import the Header component from the shared components directory
import Header from '@/components/shared/header'
// Import React library
import React from 'react'

// Define the RootLayout functional component with children props of type React.ReactNode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Return the JSX layout
  return (
    // Define a div container with full screen height and column flex layout
    <div className="flex h-screen flex-col">
      {/* Render the Header component */}
      <Header />
      {/* Define the main content area with flex-1 utility to fill available space and a custom wrapper class */}
      <main className="flex-1 wrapper">{children}</main>
      {/* Render the Footer component */}
      <Footer />
    </div>
  )
}
