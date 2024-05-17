'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaRegCircle } from 'react-icons/fa6'
import { FaRegCircleCheck } from 'react-icons/fa6'

import { ApplicationSectionType } from '@/lib/types/application'

export default function ClientSidebarSectionCard({ section }: { section: ApplicationSectionType }) {
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

  const compeltationRate = 100

  return (
    <div
      className={`cursor-pointer rounded-sm ${selectedSectionId === section.id && 'bg-n-600'} p-[4px] pl-[26px] text-[12px] text-n-300`}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(section.id)
      }}
    >
      <div className="flex items-center gap-[4px]">
        {compeltationRate == 100 ? (
          <FaRegCircleCheck className="h-[14px] w-[14px]" />
        ) : (
          <FaRegCircle className="h-[14px] w-[14px]" />
        )}
        <div className="text-[10px]">{section.title}</div>
      </div>
    </div>
  )
}
