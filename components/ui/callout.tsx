interface CalloutProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'custom'
  children: React.ReactNode
  className?: string
}

export function Callout({ variant = 'info', className, children }: CalloutProps) {
  const colorClasses =
    variant === 'success'
      ? 'bg-g-500 text-white'
      : variant === 'warning'
        ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
        : variant === 'error'
          ? 'bg-r-500 text-white'
          : variant === 'info'
            ? 'border-n-300 bg-n-100 text-n-700'
            : ''

  return (
    <div className={`rounded p-[8px] text-[14px] ${colorClasses} ${className}`} role="alert">
      {children}
    </div>
  )
}
