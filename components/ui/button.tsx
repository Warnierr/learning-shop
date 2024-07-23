// Imports React base functionalities.
import * as React from 'react'
// Imports the Slot component from Radix UI, which is used for replacing element types dynamically.
import { Slot } from '@radix-ui/react-slot'
// Imports the class-variance-authority library to handle conditional CSS class applications based on props.
import { cva, type VariantProps } from 'class-variance-authority'

// Imports a utility function for conditional class name concatenation.
import { cn } from '@/lib/utils'

// Defines button style variants using class-variance-authority, setting a base style and multiple variants.
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Type definition for the Button component props, including HTML button attributes and custom variants.
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // Prop to determine if the button should act as a Slot component or a regular button.
}

// Defines the Button component with a ref forwarding pattern.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button' // Determines if the component should use Slot for flexible element rendering.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button' // Sets a displayName for debugging purposes.

// Exports the Button component and its style variants for external usage.
export { Button, buttonVariants }
