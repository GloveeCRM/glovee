'use client'

import { FaRegCircleCheck } from 'react-icons/fa6'
import { FaRegCircle } from 'react-icons/fa6'

import { FormSectionType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

interface ClientFormSidebarSectionCardProps {
  formSection: FormSectionType
  type: 'in-progress' | 'submitted'
}

export default function ClientFormSidebarSectionCard({
  formSection,
  type,
}: ClientFormSidebarSectionCardProps) {
  const { selectedFormSectionID, setSelectedFormSectionID } = useApplicationFormContext()

  const handleClick = (formSectionID: number) => {
    if (selectedFormSectionID !== formSectionID) {
      setSelectedFormSectionID(formSectionID)
    }
  }

  return (
    <div
      className={`cursor-pointer rounded ${selectedFormSectionID === formSection.formSectionID && 'bg-n-650 text-n-100'} p-[4px] pl-[22px] text-[12px]`}
      onClick={(e) => {
        e.stopPropagation()
        handleClick(formSection.formSectionID)
      }}
    >
      <div className="flex gap-[4px]">
        {type === 'in-progress' && (
          <div className="mt-[2px]">
            {formSection.completionRate === 1 ? (
              <FaRegCircleCheck className="h-[13px] w-[13px] text-green-500" />
            ) : (
              <FaRegCircle className="h-[13px] w-[13px]" />
            )}
          </div>
        )}
        <div>{formSection.sectionName}</div>
      </div>
    </div>
  )
}
