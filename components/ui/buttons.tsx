interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
  type?: 'submit' | 'button'
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function SubmitButton({
  children,
  className,
  size = 'md',
  disabled,
  onClick,
}: SubmitButtonProps) {
  const width =
    size === 'sm'
      ? 'w-[100px]'
      : size === 'md'
        ? 'w-[200px]'
        : size === 'lg'
          ? 'w-[300px]'
          : 'w-full'
  const height = 'h-[45px]'

  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${className} ${height} ${width} rounded bg-n-300 p-[8px] transition duration-200 hover:bg-n-400 disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-500 disabled:hover:bg-n-200`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
