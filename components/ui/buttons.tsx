import { useFormStatus } from 'react-dom'
import { ImSpinner2 } from 'react-icons/im'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  hsize?: 'sm' | 'md' | 'lg' | 'full'
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({
  children,
  className,
  size = 'md',
  hsize = 'md',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const width =
    size === 'xs'
      ? 'w-[85px]'
      : size === 'sm'
        ? 'w-[100px]'
        : size === 'md'
          ? 'w-[200px]'
          : size === 'lg'
            ? 'w-[300px]'
            : 'w-full'
  const height =
    hsize === 'md'
      ? 'h - [45px]'
      : hsize === 'sm'
        ? 'h-[35px]'
        : hsize === 'lg'
          ? 'h-[55px]'
          : 'h-full'

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} ${height} ${width} cursor-pointer rounded bg-n-300 transition duration-200 hover:bg-n-400 disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-500 disabled:hover:bg-n-200`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  hsize?: 'sm' | 'md' | 'lg' | 'full'
  type?: 'submit' | 'button'
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function SubmitButton({
  children,
  className,
  size = 'md',
  hsize = 'md',
  disabled,
  onClick,
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  const width =
    size === 'xs'
      ? 'w-[85px]'
      : size === 'sm'
        ? 'w-[100px]'
        : size === 'md'
          ? 'w-[200px]'
          : size === 'lg'
            ? 'w-[300px]'
            : 'w-full'
  const height =
    hsize === 'md'
      ? 'h - [45px]'
      : hsize === 'sm'
        ? 'h-[35px]'
        : hsize === 'lg'
          ? 'h-[55px]'
          : 'h-full'

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`${className} ${height} ${width} cursor-pointer rounded bg-n-300  transition duration-200 hover:bg-n-400 disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-500 disabled:hover:bg-n-200 `}
      onClick={onClick}
    >
      {pending ? <ImSpinner2 className="mx-auto h-[20px] w-[20px] animate-spin" /> : children}
    </button>
  )
}
