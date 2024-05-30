import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/tailwind'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-[6px] h-[16px] text-[10px] dark:border-neutral-800 dark:focus:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-n-700 text-n-100 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80',
        secondary:
          'border-transparent bg-n-300 text-n-800 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        destructive:
          'border-transparent bg-red-500 text-neutral-50 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80',
        outline: 'text-neutral-950 dark:text-neutral-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
