'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaRegCircle } from 'react-icons/fa6'
import { FaRegCircleCheck } from 'react-icons/fa6'

import { ApplicationSectionType } from '@/lib/types/application'

export default function ClientSidebarSectionCard({ section }: { section: ApplicationSectionType }) {
  const searchParams = useSearchParams()
  const selectedSectionId = searchParams.get('section') || '0'
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleClick = (sectionId: number) => {
    const params = new URLSearchParams(searchParams)
    if (sectionId) {
      params.set('section', String(sectionId))
    } else {
      params.delete('section')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const compeltationRate = 100

  return (
    <div
      className={`cursor-pointer rounded-sm ${parseInt(selectedSectionId) === section.id && 'bg-n-600'} p-[4px] pl-[26px] text-[12px] text-n-300`}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(section.id)
      }}
    >
      <div className="flex gap-[4px]">
        <div className="mt-[2px]">
          {compeltationRate == 100 ? (
            <FaRegCircleCheck className="h-[13px] w-[13px] text-green-500" />
          ) : (
            <FaRegCircle className="h-[13px] w-[13px]" />
          )}
        </div>
        <div className="text-[12px]">{section.name}</div>
      </div>
    </div>
  )
}
