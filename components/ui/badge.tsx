import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/tailwind'

const badgeVariants = cva('inline-flex w-fit items-center rounded-full', {
  variants: {
    variant: {
      default: 'border-transparent bg-n-700 text-n-100',
      secondary: 'border-transparent bg-n-300 text-n-800',
      destructive: 'border-transparent bg-red-500 text-n-100',
      outline: 'text-n-900 border-n-700 border',
    },
    size: {
      default: 'px-[6px] text-[10px] h-[16px]',
      md: 'px-[6px] text-[12px] h-[18px]',
      lg: 'px-[8px] text-[14px] h-[20px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
