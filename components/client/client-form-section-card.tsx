'use client'

import { FaRegCircleCheck } from 'react-icons/fa6'
import { FaRegCircle } from 'react-icons/fa6'

import { FormSectionType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

interface ClientFormSidebarSectionCardProps {
  section: FormSectionType
  type: 'in-progress' | 'submitted'
}

export default function ClientFormSidebarSectionCard({
  section,
  type,
}: ClientFormSidebarSectionCardProps) {
  const { selectedFormSectionID, setSelectedFormSectionID } = useApplicationFormContext()

  const handleClick = (sectionID: number) => {
    if (selectedFormSectionID !== sectionID) {
      setSelectedFormSectionID(sectionID)
    }
  }

  return (
    <div
      className={`cursor-pointer rounded ${selectedFormSectionID === section.formSectionID && 'bg-n-650 text-n-100'} p-[4px] pl-[22px] text-[12px]`}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(section.formSectionID)
      }}
    >
      <div className="flex gap-[4px]">
        {type === 'in-progress' && (
          <div className="mt-[2px]">
            {section.completionRate === 100 ? (
              <FaRegCircleCheck className="h-[13px] w-[13px] text-green-500" />
            ) : (
              <FaRegCircle className="h-[13px] w-[13px]" />
            )}
          </div>
        )}
        <div>{section.sectionName}</div>
      </div>
    </div>
  )
}
