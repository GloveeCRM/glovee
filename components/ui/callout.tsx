interface CalloutProps {
  variant?: 'success' | 'warning' | 'error' | 'info'
  children: React.ReactNode
  className?: string
}

export default function Callout({ variant = 'info', className, children }: CalloutProps) {
  const colorClasses =
    variant === 'success'
      ? 'bg-emerald-100 text-emerald-700'
      : variant === 'warning'
        ? 'border-yellow-500 bg-yellow-100 text-yellow-700'
        : variant === 'error'
          ? 'bg-red-100 text-red-700'
          : 'border-n-300 bg-n-100 text-n-700'

  return (
    <div className={`rounded p-[8px] text-[14px] ${colorClasses} ${className}`} role="alert">
      {children}
    </div>
  )
}
