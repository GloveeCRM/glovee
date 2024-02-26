const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

interface IconSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function IconSkeleton({ className, size = 'md' }: IconSkeletonProps) {
  const width = size === 'sm' ? 'w-[20px]' : size === 'md' ? 'w-[40px]' : 'w-[60px]'
  const height = size === 'sm' ? 'h-[20px]' : size === 'md' ? 'h-[40px]' : 'h-[60px]'
  return <div className={`${className} ${height} ${width} rounded-md bg-gray-300`} />
}

interface ButtonSkeletonProps {
  children?: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}
function ButtonSkeleton({ children, className, size = 'md' }: ButtonSkeletonProps) {
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
    <div
      className={`${className} ${height} ${width} flex items-center justify-center rounded-md bg-gray-300`}
    >
      {children}
    </div>
  )
}

interface TitleSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}
function TitleSkeleton({ className, size = 'md' }: TitleSkeletonProps) {
  const width = size === 'sm' ? 'w-[100px]' : size === 'md' ? 'w-[200px]' : 'w-[300px]'
  const height = 'h-[16px]'
  return <div className={`${className} ${height} ${width} rounded-md bg-gray-300`} />
}

function TextInputFieldSkeleton() {
  return <div className="h-[35px] w-full rounded-md bg-gray-300" />
}

interface TextInputQuestionSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function TextInputQuestionSkeleton({ className, size = 'md' }: TextInputQuestionSkeletonProps) {
  return (
    <div className={`${className} flex flex-col gap-[8px]`}>
      <TitleSkeleton size={size} />
      <TextInputFieldSkeleton />
    </div>
  )
}

interface FormHeadingSkeletonProps {
  className?: string
}

function FormHeadingSkeleton({ className }: FormHeadingSkeletonProps) {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <TitleSkeleton size="sm" className="mb-[8px]" />
      <DividerSkeleton className="mb-[16px]" />
    </div>
  )
}

interface DividerSkeletonProps {
  className?: string
}

function DividerSkeleton({ className }: DividerSkeletonProps) {
  return <div className={`${className} h-[2px] w-full bg-gray-200`} />
}

export function LoginFormSkeleton() {
  return (
    <div
      className={`${shimmer} w-full max-w-[420px] rounded-md bg-gray-100 px-[20px] py-[40px] shadow-sm`}
    >
      <TextInputQuestionSkeleton size="sm" className="mb-[26px]" />
      <TextInputQuestionSkeleton className="mb-[46px]" />
      <TitleSkeleton size="md" className="mb-[26px] bg-gray-400" />
      <ButtonSkeleton className="mx-auto mb-[16px]" size="lg">
        <TitleSkeleton size="sm" className="bg-gray-200" />
      </ButtonSkeleton>
      <ButtonSkeleton className="mx-auto mb-[36px]" size="lg">
        <IconSkeleton size="sm" className="bg-gray-200" />
      </ButtonSkeleton>
      <div className="flex justify-center gap-[8px]">
        <TitleSkeleton />
        <TitleSkeleton size="sm" className="bg-gray-200" />
      </div>
    </div>
  )
}

export function SignUpFormSkeleton() {
  return (
    <div
      className={`${shimmer} w-full max-w-[420px] rounded-md bg-gray-100 px-[20px] py-[40px] shadow-sm`}
    >
      <TextInputQuestionSkeleton size="sm" className="mb-[26px]" />
      <TextInputQuestionSkeleton className="mb-[46px]" />
      <ButtonSkeleton className="mx-auto mb-[16px]" size="lg">
        <TitleSkeleton size="sm" className="bg-gray-200" />
      </ButtonSkeleton>
      <ButtonSkeleton className="mx-auto mb-[36px]" size="lg">
        <IconSkeleton size="sm" className="bg-gray-200" />
      </ButtonSkeleton>
      <div className="flex justify-center gap-[8px]">
        <TitleSkeleton />
        <TitleSkeleton size="sm" className="bg-gray-200" />
      </div>
    </div>
  )
}

export function ResetPasswordFormSkeleton() {
  return (
    <div className={`w-full max-w-[420px] rounded-md bg-gray-100 px-[20px] py-[30px] shadow-sm`}>
      <FormHeadingSkeleton />
      <TextInputQuestionSkeleton size="sm" className="mb-[16px]" />
      <ButtonSkeleton className="mx-auto mb-[30px]" size="full">
        <TitleSkeleton size="sm" className="bg-gray-200" />
      </ButtonSkeleton>
      <TitleSkeleton size="sm" className="bg-gray-200" />
    </div>
  )
}
