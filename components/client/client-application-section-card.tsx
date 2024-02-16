'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ClientSidebarSectionCard({ section }: { section: any }) {
  const searchParams = useSearchParams()
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
    <div className="cursor-pointer " onClick={() => handleClick(section.id)}>
      {section.title}
    </div>
  )
}
