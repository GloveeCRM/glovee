'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { TemplateSection } from './template-preview-categories'

export default function TemplatePreviewSectionCard({
  templateSection,
}: {
  templateSection: TemplateSection
}) {
  const searchParams = useSearchParams()
  const selectedSectionId = searchParams.get('section')
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleClick = (sectionId: string) => {
    const params = new URLSearchParams(searchParams)
    if (sectionId) {
      params.set('section', sectionId)
    } else {
      params.delete('section')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      className={`cursor-pointer ${selectedSectionId === templateSection.id && 'bg-n-500'} p-[4px] text-[12px] text-n-300`}
      onClick={() => handleClick(templateSection.id)}
    >
      {templateSection.title}
    </div>
  )
}
