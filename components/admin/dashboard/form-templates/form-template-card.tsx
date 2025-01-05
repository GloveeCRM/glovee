import Link from 'next/link'
import { HiOutlinePencilSquare, HiOutlineEye } from 'react-icons/hi2'

import { FormTemplateType } from '@/lib/types/form'

import FormTemplateCardOptionsMenuButton from './form-template-card-options-menu-button'

interface FormTemplateCardProps {
  formTemplate: FormTemplateType
}

export default function FormTemplateCard({ formTemplate }: FormTemplateCardProps) {
  return (
    <div className="group/form-template-card flex flex-col justify-between gap-[20px] rounded-lg bg-white p-[12px] shadow-sm">
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-[14px] font-medium">{formTemplate.form.formName}</div>
          <FormTemplateCardOptionsMenuButton formTemplateID={formTemplate.formTemplateID} />
        </div>
        <div className="text-[12px] text-n-500">{formTemplate.form.formDescription}</div>
      </div>
      <div className="flex justify-end gap-[8px]">
        <Link
          href={`/admin/form-template/${formTemplate.formTemplateID}/preview`}
          className="flex items-center gap-[4px] rounded-md bg-teal-100 px-[8px] py-[2px] text-teal-900 hover:bg-teal-200"
        >
          <HiOutlineEye className="h-[18px] w-[18px]" />
          <span className="text-[12px]">View</span>
        </Link>
        <Link
          href={`/admin/form-template/${formTemplate.formTemplateID}/edit`}
          className="flex items-center gap-[4px] rounded-md bg-coral-100 px-[8px] py-[2px] text-coral-900 hover:bg-coral-200"
        >
          <HiOutlinePencilSquare className="h-[18px] w-[18px]" />
          <span className="text-[12px]">Edit</span>
        </Link>
      </div>
    </div>
  )
}
