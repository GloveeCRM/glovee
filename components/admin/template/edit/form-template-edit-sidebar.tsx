import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import { Separator } from '@/components/ui/separator'
import EditableFormTemplateInfoCard from './editable-form-template-info-card'
import FormTemplateEditSidebarCategoryWrapper from './form-template-edit-sidebar-category-wrapper'

export default function FormTemplateEditSidebar() {
  return (
    <div className="z-10 flex h-svh w-[240px] flex-shrink-0 flex-col gap-[8px] overflow-x-hidden overflow-y-scroll bg-zinc-800 px-[8px] py-[8px] text-white">
      <div id="sidebar-header" className="sticky top-0 z-10 flex flex-col gap-[8px]">
        <Link
          href="/admin/form-templates/"
          className="flex w-fit items-center gap-[4px] hover:underline"
        >
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <EditableFormTemplateInfoCard />
      </div>
      <Separator className="bg-zinc-700" />
      <div id="sidebar-categories">
        <FormTemplateEditSidebarCategoryWrapper />
      </div>
    </div>
  )
}
