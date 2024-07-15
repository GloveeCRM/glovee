import * as React from 'react'

import { cn } from '@/lib/utils/tailwind'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-[34px] w-full rounded-sm border border-n-300 bg-transparent px-[6px] py-[4px] text-[14px] transition-colors file:border-0 file:bg-transparent file:text-[14px] file:font-medium placeholder:text-n-450 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 read-only:focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
