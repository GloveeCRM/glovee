import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/tailwind'

const badgeVariants = cva('inline-flex items-center rounded-full px-[6px] h-[16px] text-[10px]', {
  variants: {
    variant: {
      default: 'border-transparent bg-n-700 text-n-100',
      secondary: 'border-transparent bg-n-300 text-n-800',
      destructive: 'border-transparent bg-red-500 text-n-100',
      outline: 'text-n-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
