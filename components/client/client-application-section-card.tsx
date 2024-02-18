'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Section } from './application-categories'

export default function ClientSidebarSectionCard({ section }: { section: Section }) {
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
      className={`cursor-pointer ${selectedSectionId === section.id && 'bg-n-500'} p-[4px] text-[12px] text-n-300`}
      onClick={() => handleClick(section.id)}
    >
      {section.title}
    </div>
  )
}
