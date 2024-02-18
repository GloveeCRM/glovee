import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import TemplateInfoCard from './template-info-card'

export default async function TemplatePreviewSidebar({ templateId }: { templateId: string }) {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-col bg-n-700 text-white">
      <div className="flex p-[8px]">
        <IoChevronBackOutline className="h-[26px] w-[26px]" />
        <Link href={'/admin/templates'}>
          <span className="text-[12px]">Back</span>
        </Link>
      </div>
      <TemplateInfoCard className="mx-[8px]" templateId={templateId} />
      <div>Create a Category</div>
    </div>
  )
}
