import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import { searchFormTemplates } from '@/lib/data/form'

import TemplateInfoCard from './template-info-card'
import TemplateEditSidebarCategoryWrapper from './template-edit-sidebar-category-wrapper'

interface TemplateEditSidebarProps {
  formTemplateID: number
}

export default async function TemplateEditSidebar({ formTemplateID }: TemplateEditSidebarProps) {
  const { formTemplates } = await searchFormTemplates({
    filters: {
      templateID: formTemplateID,
    },
    limit: 1,
  })

  return (
    <div className="z-10 flex h-svh w-[240px] flex-shrink-0 flex-col overflow-x-hidden overflow-y-scroll bg-n-700 px-[8px] text-n-100">
      <div id="sidebar-header" className="sticky top-0 z-10 flex flex-col bg-n-700 py-[6px]">
        <Link href="/admin/templates/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <TemplateInfoCard formTemplate={formTemplates?.[0]} editable={true} />
      </div>
      <div id="sidebar-categories" className="">
        <TemplateEditSidebarCategoryWrapper />
      </div>
    </div>
  )
}
