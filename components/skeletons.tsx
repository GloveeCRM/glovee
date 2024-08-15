import { Children } from 'react'

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
  size?: 'sm' | 'md' | 'lg' | 'full'
}
export function TitleSkeleton({ className, size = 'md' }: TitleSkeletonProps) {
  const width =
    size === 'sm'
      ? 'w-[100px]'
      : size === 'md'
        ? 'w-[200px]'
        : size === 'lg'
          ? 'w-[300px]'
          : 'w-full'
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

interface SquareSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

function SquareSkeleton({ className, size }: SquareSkeletonProps) {
  const sizeClass =
    size === 'sm' ? 'h-[36px] w-1/5' : size === 'full' ? 'h-[36px] w-full' : 'h-[36px] w-full'
  return <div className={`${className} ${sizeClass} items-center justify-center rounded`}></div>
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

export function TemplateCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-md bg-n-100 p-[8px]">
      <TitleSkeleton size="sm" className=" mb-[8px] bg-n-400" />
      <TitleSkeleton size="md" className=" mb-[10px]  bg-n-300" />
      <div className="flex gap-[8px]">
        <SquareSkeleton size="full" className="bg-n-400" />
        <SquareSkeleton size="sm" className="bg-n-400" />
      </div>
    </div>
  )
}

export function CreateNewTemplateCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[8px] rounded-md border border-dashed border-n-400">
      <IconSkeleton size="md" className="bg-n-200" />
      <TitleSkeleton size="sm" className="bg-n-300" />
    </div>
  )
}

export function TemplateCardWrapperSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CreateNewTemplateCardSkeleton />
      <TemplateCardSkeleton />
      <TemplateCardSkeleton />
      <TemplateCardSkeleton />
    </div>
  )
}

export function TemplateInfoCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[5px] rounded bg-n-600 p-[8px]">
      <TitleSkeleton size="sm" className="bg-n-400" />
      <div className="flex flex-col gap-[4px]">
        <TitleSkeleton size="full" className="bg-n-500" />
        <TitleSkeleton size="full" className="bg-n-500" />
      </div>
    </div>
  )
}

function TemplateEditSidebarCategorySkeleton() {
  return (
    <div className="flex items-center gap-[4px] rounded bg-n-600/80 p-[10px]">
      <div>
        <IconSkeleton className="h-[25px] w-[25px] bg-n-500" />
      </div>
      <TitleSkeleton className="w-[135px] bg-n-500" />
    </div>
  )
}

interface TemplateEditSidebarSectionSkeletonProps {
  selected?: boolean
}

function TemplateEditSidebarSectionSkeleton({ selected }: TemplateEditSidebarSectionSkeletonProps) {
  return (
    <div
      className={`flex items-center gap-[4px] rounded py-[8px] pl-[40px] ${selected ? 'bg-n-500/60' : 'bg-n-600/50'}`}
    >
      <div>
        <IconSkeleton size="sm" className={`${selected ? 'bg-n-400' : 'bg-n-500'}`} />
      </div>
      <TitleSkeleton className={`${selected ? 'bg-n-400' : 'bg-n-500'}`} size="sm" />
    </div>
  )
}

export function TemplateEditSidebarCategoryWrapperSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[12px] rounded bg-n-600/50 p-[6px]">
      <div className="flex flex-col gap-[6px]">
        <TemplateEditSidebarCategorySkeleton />
        <TemplateEditSidebarSectionSkeleton selected />
        <TemplateEditSidebarSectionSkeleton />
        <TemplateEditSidebarSectionSkeleton />
      </div>

      <TemplateEditSidebarCategorySkeleton />
      <TemplateEditSidebarCategorySkeleton />
      <TemplateEditSidebarCategorySkeleton />
    </div>
  )
}

interface FlatQuestionSetSkeletonProps {
  empty?: boolean
  questions?: number
}

function FlatQuestionSetSkeleton({ empty = false, questions = 2 }: FlatQuestionSetSkeletonProps) {
  const questionSkeletons = Array.from({ length: questions }, (_, i) => (
    <div key={i} className="flex flex-col gap-[8px] rounded bg-n-200/80 px-[8px] py-[12px]">
      <TitleSkeleton size="md" className="bg-n-400" />
      <TextInputFieldSkeleton className="bg-n-300" />
    </div>
  ))

  return (
    <div className="animate-pulse rounded-md bg-n-300 p-[6px]">
      <div
        className={`relative min-h-[100px] rounded border-[2px] border-dashed border-n-400 ${empty && 'bg-n-200/80'}`}
      >
        {!empty ? (
          <div className="flex flex-col gap-[8px] p-[4px]">{questionSkeletons}</div>
        ) : (
          <div className="absolute left-1/2 top-1/2 h-[18px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded bg-n-300" />
        )}
      </div>
    </div>
  )
}

interface LoopQuestionSetSkeletonProps {
  empty?: boolean
}

export function LoopQuestionSetSkeleton({ empty = false }: LoopQuestionSetSkeletonProps) {
  return (
    <div className="animate-pulse rounded-md bg-n-100 p-[6px]">
      <div
        className={`relative min-h-[100px] rounded border-[2px] border-dashed border-n-300 ${empty && 'bg-n-100/80'}`}
      >
        {!empty ? (
          <div className="flex flex-col gap-[8px] p-[4px]">
            <FlatQuestionSetSkeleton empty />
            <FlatQuestionSetSkeleton questions={1} />
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 h-[18px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded bg-n-200" />
        )}
      </div>
      <div className="h-[40px]" />
    </div>
  )
}

export function QuestionsEditBoardSkeleton() {
  return (
    <div className="rounded-lg bg-n-200 p-[4px]">
      <FlatQuestionSetSkeleton />
    </div>
  )
}
