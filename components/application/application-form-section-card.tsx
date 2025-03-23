'use client'

import { FaRegCircleCheck, FaRegCircle } from 'react-icons/fa6'

import { FormSectionType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

interface ApplicationFormSectionCardProps {
  formSection: FormSectionType
  showProgressIndicator: boolean
}

export default function ApplicationFormSectionCard({
  formSection,
  showProgressIndicator,
}: ApplicationFormSectionCardProps) {
  const { selectedFormSectionID, setSelectedFormSectionID } = useFormContext()

  const handleClickSection = (formSectionID: number) => {
    if (selectedFormSectionID !== formSectionID) {
      setSelectedFormSectionID(formSectionID)
    }
  }

  return (
    <div
      className={`cursor-pointer rounded ${selectedFormSectionID === formSection.formSectionID && 'bg-n-650 text-n-100'} p-[4px] pl-[22px] text-[12px]`}
      onClick={(e) => {
        e.stopPropagation()
        handleClickSection(formSection.formSectionID)
      }}
    >
      <div className="flex gap-[4px]">
        {showProgressIndicator && (
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
