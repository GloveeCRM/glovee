interface IconSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function IconSkeleton({ className, size = 'md' }: IconSkeletonProps) {
  const width = size === 'sm' ? 'w-[20px]' : size === 'md' ? 'w-[40px]' : 'w-[60px]'
  const height = size === 'sm' ? 'h-[20px]' : size === 'md' ? 'h-[40px]' : 'h-[60px]'
  return <div className={`${className} ${height} ${width} rounded-md`} />
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
    <div className={`${className} ${height} ${width} flex items-center justify-center rounded-md`}>
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
  return <div className={`${className} ${height} ${width} rounded-md`} />
}

interface TextInputFieldSkeletonProps {
  className?: string
}

function TextInputFieldSkeleton({ className }: TextInputFieldSkeletonProps) {
  return <div className={`${className} h-[35px] w-full rounded-md`} />
}

interface TextInputQuestionSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function TextInputQuestionSkeleton({ className, size = 'md' }: TextInputQuestionSkeletonProps) {
  return (
    <div className={`${className} flex flex-col gap-[8px]`}>
      <TitleSkeleton size={size} className="bg-n-400" />
      <TextInputFieldSkeleton className="bg-n-300" />
    </div>
  )
}

interface FormHeadingSkeletonProps {
  className?: string
}

function FormHeadingSkeleton({ className }: FormHeadingSkeletonProps) {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <TitleSkeleton size="sm" className="mb-[8px] bg-n-400" />
      <DividerSkeleton className="mb-[16px]" />
    </div>
  )
}

interface DividerSkeletonProps {
  className?: string
}

function DividerSkeleton({ className }: DividerSkeletonProps) {
  return <div className={`${className} h-[2px] w-full bg-n-200`} />
}

interface LogoSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

function LogoSkeleton({ className, size }: LogoSkeletonProps) {
  const sizeClass =
    size === 'sm'
      ? 'h-[40px] w-[40px]'
      : size === 'md'
        ? 'h-[65px] w-[65px]'
        : size === 'lg'
          ? 'h-[85px] w-[85px]'
          : 'h-[110px] w-[110px]'
  return <div className={`${className} ${sizeClass} rounded-full bg-n-200`} />
}

export function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-[420px] animate-pulse rounded-md bg-n-100 px-[20px] py-[30px] shadow-sm">
      <FormHeadingSkeleton />
      <TextInputQuestionSkeleton size="sm" className="mb-[26px]" />
      <TextInputQuestionSkeleton className="mb-[36px]" />
      <ButtonSkeleton className="mx-auto mb-[16px] bg-n-300" size="full">
        <TitleSkeleton size="sm" className="bg-n-400" />
      </ButtonSkeleton>
      <ButtonSkeleton className="mx-auto mb-[36px] bg-n-300" size="full">
        <IconSkeleton size="sm" className="bg-n-200" />
      </ButtonSkeleton>
      <TitleSkeleton size="md" className="mb-[26px] bg-n-400" />
      <div className="flex justify-center gap-[8px]">
        <TitleSkeleton className="bg-n-300" />
        <TitleSkeleton size="sm" className="bg-n-400" />
      </div>
    </div>
  )
}

export function SignUpFormSkeleton() {
  return (
    <div className="w-full max-w-[420px] animate-pulse rounded-md bg-n-100 px-[20px] py-[30px] shadow-sm">
      <FormHeadingSkeleton />
      <TextInputQuestionSkeleton size="sm" className="mb-[26px]" />
      <TextInputQuestionSkeleton className="mb-[26px]" />
      <TextInputQuestionSkeleton className="mb-[36px]" />
      <ButtonSkeleton className="mx-auto mb-[16px] bg-n-300" size="full">
        <TitleSkeleton size="sm" className="bg-n-400" />
      </ButtonSkeleton>
      <ButtonSkeleton className="mx-auto mb-[26px] bg-n-300" size="full">
        <IconSkeleton size="sm" className="bg-n-200" />
      </ButtonSkeleton>
      <div className="flex justify-center gap-[8px]">
        <TitleSkeleton className="bg-n-300" />
        <TitleSkeleton size="sm" className="bg-n-400" />
      </div>
    </div>
  )
}

export function ResetPasswordFormSkeleton() {
  return (
    <div className="w-full max-w-[420px] animate-pulse rounded-md bg-n-100 px-[20px] py-[30px] shadow-sm">
      <FormHeadingSkeleton />
      <TextInputQuestionSkeleton size="sm" className="mb-[16px]" />
      <ButtonSkeleton className="mx-auto mb-[30px] bg-n-300" size="full">
        <TitleSkeleton size="sm" className="bg-n-400" />
      </ButtonSkeleton>
      <TitleSkeleton size="sm" className="bg-n-300" />
    </div>
  )
}

export function OrgInfoCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-[8px] rounded-md bg-n-600 p-[6px]">
      <LogoSkeleton className="bg-n-500" size="md" />
      <TitleSkeleton size="sm" className="bg-n-500" />
    </div>
  )
}
