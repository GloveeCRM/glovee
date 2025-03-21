import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import PreviewFormTemplateInfoCard from '@/components/admin/template/preview/preview-form-template-info-card'
import FormTemplatePreviewCategoriesContainer from './form-template-preview-categories-container'
import { Separator } from '@/components/ui/separator'

interface FormTemplatePreviewSidebarProps {
  formTemplateID: number
}

export default async function FormTemplatePreviewSidebar({
  formTemplateID,
}: FormTemplatePreviewSidebarProps) {
  return (
    <div
      id="application-form-sidebar"
      className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col gap-[16px] bg-zinc-800 px-[8px] text-white"
    >
      <div id="application-form-sidebar-header" className="flex flex-col gap-[8px]">
        <Link
          href={`/admin/form-template/${formTemplateID}/edit`}
          className="flex w-fit items-center gap-[4px] py-[8px]"
        >
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[14px]">Form Template Editor</span>
        </Link>
        <div className="flex flex-col gap-[6px]">
          <PreviewFormTemplateInfoCard />
          <Separator className="bg-zinc-700" />
        </div>
      </div>
      <FormTemplatePreviewCategoriesContainer />
    </div>
  )
}
