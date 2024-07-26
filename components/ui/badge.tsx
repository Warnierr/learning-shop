import * as React from 'react'
// Import cva function and VariantProps type from 'class-variance-authority'
import { cva, type VariantProps } from 'class-variance-authority'

// Import cn function from utils library
import { cn } from '@/lib/utils'

// Define badgeVariants using cva function
const badgeVariants = cva(
  // Base classes for the badge
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    // Variants for the badge
    variants: {
      variant: {
        // Default variant classes
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        // Secondary variant classes
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Destructive variant classes
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        // Outline variant classes
        outline: 'text-foreground',
      },
    },
    // Default variant value
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Define BadgeProps interface
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    // Apply combined classes using cn function
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export Badge component and badgeVariants
export { Badge, badgeVariants }
