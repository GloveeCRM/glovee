'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io'

export default function ClientSidebarCategoryCard({
  category,
  isExpanded,
  onClick,
}: {
  category: any
  isExpanded: boolean
  onClick: (categoryId: string) => void
}) {
  const sections = category?.sections
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
    <div>
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-[13px] text-n-300"
          onClick={() => onClick(category.id)}
        >
          {isExpanded ? (
            <IoMdArrowDropdown className="h-[22px] w-[22px]" />
          ) : (
            <IoMdArrowDropright className="h-[22px] w-[22px]" />
          )}
          <span>{category.title}</span>
        </button>
      </div>
      {isExpanded &&
        sections?.map((section: any) => (
          <button key={section.id} onClick={() => handleClick(section.id)}>
            {section.title}
          </button>
        ))}
    </div>
  )
}
function useDebouncedCallback(term: any) {
  throw new Error('Function not implemented.')
}
