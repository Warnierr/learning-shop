// Import the 'cn' utility function for conditional class name binding
import { cn } from '@/lib/utils'

// Define the ProductPrice functional component with props for 'value' and optional 'className'
const ProductPrice = ({
  value,
  className,
}: {
  value: number // Expected to be a numeric value for the price
  className?: string // Optional additional CSS classes
}) => {
  // Convert the numeric value to a string to manipulate its format
  const stringValue = value.toString()
  // Split the string value into integer and decimal parts if a decimal exists
  const [intValue, floatValue] = stringValue.includes('.')
    ? stringValue.split('.')
    : [stringValue, ''] // If no decimal, floatValue is an empty string

  // Return JSX with styled price components
  return (
    // Apply default and additional classes using the 'cn' utility function
    <p className={cn('text-2xl', className)}>
      {/* Render the dollar sign with a smaller font size and superscript alignment */}
      <span className="text-xs align-super">$</span>
      {/* Render the integer part of the price */}
      {intValue}
      {/* If there is a fractional part, render it also with a smaller font size and superscript alignment */}
      <span className="text-xs align-super">{floatValue}</span>
    </p>
  )
}

// Export the ProductPrice component for use in other parts of the application
export default ProductPrice
