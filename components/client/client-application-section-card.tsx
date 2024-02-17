'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ClientSidebarSectionCard({ section }: { section: any }) {
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
      className={`cursor-pointer ${selectedSectionId === section.id && 'bg-yellow-200'}`}
      onClick={() => handleClick(section.id)}
    >
      {section.title}
    </div>
  )
}
