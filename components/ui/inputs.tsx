interface InputLabelProps {
  htmlFor: string
  children: React.ReactNode
  className?: string
  text?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'bold' | 'semibold'
}

export function InputLabel({
  htmlFor,
  children,
  className,
  text = 'sm',
  weight = 'normal',
}: InputLabelProps) {
  const textSize =
    text === 'sm'
      ? 'text-[14px]'
      : text === 'md'
        ? 'text-[16px]'
        : text === 'lg'
          ? 'text-[18px]'
          : 'text-[14px]'

  const fontWeight =
    weight === 'normal'
      ? 'font-normal'
      : weight === 'medium'
        ? 'font-medium'
        : weight === 'bold'
          ? 'font-bold'
          : weight === 'semibold'
            ? 'font-semibold'
            : 'font-normal'
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} ${textSize} ${fontWeight} block font-semibold text-n-600`}
    >
      {children}
    </label>
  )
}

interface TextInputProps {
  id?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
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
  const height =
    size === 'xs'
      ? 'h-[30px]'
      : size === 'sm'
        ? 'h-[36px]'
        : size === 'md'
          ? 'h-[42px]'
          : 'h-[54px]'

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
  gap?: 'sm' | 'md' | 'lg'
  errors?: string[] | string
}

export function FormInput({ children, id, className, gap = 'md', errors }: FormInputProps) {
  const gapSize =
    gap === 'sm'
      ? 'gap-[4px]'
      : gap === 'md'
        ? 'gap-[8px]'
        : gap === 'lg'
          ? 'gap-[12px]'
          : 'gap-[8px]'
  const errorMt =
    gap === 'sm' ? 'mt-[2px]' : gap === 'md' ? 'mt-[4px]' : gap === 'lg' ? 'mt-[6px]' : 'mt-[4px]'
  return (
    <div id={id} className={`${className}`}>
      <div className={`flex flex-col ${gapSize}`}>{children}</div>
      {Array.isArray(errors) ? (
        errors.map((error, index) => (
          <InputError key={index} className={errorMt}>
            {error}
          </InputError>
        ))
      ) : (
        <InputError className={errorMt}>{errors}</InputError>
      )}
    </div>
  )
}
