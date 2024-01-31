import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import { fetchTemplateById } from '@/lib/data/template'
import TemplateInfoCard from './template-info-card'

export default async function PreviewSidebar() {
  const template = await fetchTemplateById(1)
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-col bg-n-700 text-white">
      <div className="flex p-[8px]">
        <IoChevronBackOutline className="h-[26px] w-[26px]" />
        <Link href={'/admin/templates'}>
          <span className="text-[12px]">Back</span>
        </Link>
      </div>
      <TemplateInfoCard className="mx-[8px]" template={template} />
      <div>Create a Category</div>
    </div>
  )
}
