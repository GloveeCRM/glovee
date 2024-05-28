interface Option {
  id: number | string
  value: string | number
  name: string
  title?: string
}

interface SelectProps {
  name: string
  id: string
  text?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'bold' | 'semibold'
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
  defaultValue?: string
  options: Option[]
}

export function Select({
  id,
  name,
  text = 'sm',
  weight = 'normal',
  size = 'full',
  className,
  defaultValue = '',
  options,
}: SelectProps) {
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

  const width =
    size === 'sm'
      ? 'w-[100px]'
      : size === 'md'
        ? 'w-[200px]'
        : size === 'lg'
          ? 'w-[300px]'
          : 'w-full'
  return (
    <select
      name={name}
      id={id}
      className={`${className} ${textSize} ${fontWeight} ${width} 'h-[30px]' rounded-sm border-[1px] border-n-400 px-[8px] py-[3px] transition autofill:bg-none autofill:outline-n-400 focus:border-n-400 focus:outline focus:outline-[1px] focus:outline-n-400`}
      defaultValue={defaultValue}
    >
      <option value="" disabled>
        --Select--
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value || option.id}>
          {option.name || option.title}
        </option>
      ))}
    </select>
  )
}
