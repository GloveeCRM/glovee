import * as React from 'react'

import { cn } from '@/lib/utils/tailwind'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-sm border border-n-300 bg-transparent px-[6px] py-[4px] text-[14px] transition-colors placeholder:text-n-450 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 read-only:focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
