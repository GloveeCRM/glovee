interface InputLabelProps {
  htmlFor: string
  children: React.ReactNode
  className?: string
}

export function InputLabel({ htmlFor, children, className }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`${className} block font-semibold text-n-600`}>
      {children}
    </label>
  )
}

interface TextInputProps {
  id?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
  placeholder: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function TextInput({
  id,
  size = 'md',
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  className,
}: TextInputProps) {
  const height = size === 'sm' ? 'h-[36px]' : size === 'md' ? 'h-[42px]' : 'h-[54px]'

  return (
    <input
      id={id}
      name={name}
      type="text"
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={`${className} ${height} w-full rounded border-[1px] border-n-300 px-4 py-2 transition autofill:bg-none autofill:outline-n-400 focus:border-n-400 focus:outline focus:outline-[1px] focus:outline-n-400`}
    />
  )
}

interface PasswordInputProps {
  id?: string
  name?: string
  placeholder: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function PasswordInput({
  id,
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  className,
}: PasswordInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="password"
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={`${className} w-full rounded border-[1px] border-n-300 px-4 py-2 transition autofill:bg-none autofill:outline-n-400 focus:border-n-400 focus:outline focus:outline-[1px] focus:outline-n-400`}
    />
  )
}

interface InputErrorProps {
  children: React.ReactNode
  className?: string
}

export function InputError({ children, className }: InputErrorProps) {
  return <p className={`${className} text-[13px] font-medium text-red-600`}>{children}</p>
}

interface FormInputProps {
  children: React.ReactNode
  id?: string
  className?: string
  error?: string
}

export function FormInput({ children, id, className, error }: FormInputProps) {
  return (
    <div id={id} className={`${className}`}>
      <div className="flex flex-col gap-[10px]">{children}</div>
      {error && <InputError className="mt-[6px]">{error}</InputError>}
    </div>
  )
}
