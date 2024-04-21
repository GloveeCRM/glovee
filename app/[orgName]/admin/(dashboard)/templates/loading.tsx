import { TemplateCardWrapperSkeleton, TitleSkeleton } from '@/components/skeletons'

export default function TemplatesLoadingPage() {
  return (
    <>
      <TitleSkeleton className="my-[12px] bg-n-400/75" size="md" />
      <TemplateCardWrapperSkeleton />
    </>
  )
}
