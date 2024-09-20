'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { FaRegCircle } from 'react-icons/fa6'

import { FormSectionType } from '@/lib/types/form'

interface ClientFormSidebarSectionCardProps {
  section: FormSectionType
  type: 'inProgress' | 'submitted'
}

export default function ClientFormSidebarSectionCard({
  section,
  type,
}: ClientFormSidebarSectionCardProps) {
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

  return (
    <div
      className={`cursor-pointer rounded ${parseInt(selectedSectionId) === section.id && 'bg-n-650 text-n-100'} p-[4px] pl-[22px] text-[12px]`}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(section.id)
      }}
    >
      <div className="flex gap-[4px]">
        {type === 'inProgress' && (
          <div className="mt-[2px]">
            {section.completionRate === 100 ? (
              <FaRegCircleCheck className="h-[13px] w-[13px] text-green-500" />
            ) : (
              <FaRegCircle className="h-[13px] w-[13px]" />
            )}
          </div>
        )}
        <div>{section.name}</div>
      </div>
    </div>
  )
}
