import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/tailwind'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'bg-n-700 text-n-100 hover:bg-n-900 dark:bg-n-100 dark:text-n-900 dark:hover:bg-n-200',
        secondary: 'bg-n-200 text-n-900 hover:bg-n-300',
        outline:
          'border border-n-700 text-n-700 hover:bg-n-700 hover:text-n-100 dark:border-n-800 dark:bg-n-900 dark:hover:bg-n-800 dark:hover:text-n-100',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-n-100 dark:hover:bg-red-900',
        ghost: 'hover:bg-n-200 hover:text-n-900 dark:hover:bg-n-800 dark:hover:text-n-100',
        link: 'text-n-900 underline-offset-4 hover:underline dark:text-n-100',
      },
      size: {
        default: 'px-[8px] py-[8px]',
        sm: 'px-[6px] py-[4px] text-[12px]',
        md: 'px-[10px] py-[6px] text-[14px]',
        lg: 'px-[12px] py-[8px] text-[16px]',
        icon: 'h-[28px] w-[28px] text-[15px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
