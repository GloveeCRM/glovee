'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function TemplatePreviewSectionCard({ templateSection }: { templateSection: any }) {
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
      className={`cursor-pointer ${selectedSectionId === templateSection.id && 'bg-n-500'} p-[4px] text-[12px]`}
      onClick={() => handleClick(templateSection.id)}
    >
      {templateSection.title}
    </div>
  )
}
