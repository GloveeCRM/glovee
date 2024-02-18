import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import TemplateInfoCard from './template-info-card'
import SidebarCategories from './sidebar-categories'

export default async function TemplateEditSidebar({ templateId }: { templateId: string }) {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-col bg-n-700 text-white">
      <div className="flex items-center gap-[4px] p-[8px]">
        <IoChevronBackOutline className="h-[20px] w-[20px]" />
        <Link href={`/admin/templates/`}>
          <span className="text-[16px]">Back</span>
        </Link>
      </div>
      <TemplateInfoCard templateId={templateId} className="mx-[8px]" />
      <SidebarCategories templateId={templateId} />
    </div>
  )
}
