'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ClientSidebarSectionCard({ section }: { section: any }) {
  const searchParams = useSearchParams()
  const selectedSectionId = searchParams.get('section')
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleClick = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('section', term)
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
