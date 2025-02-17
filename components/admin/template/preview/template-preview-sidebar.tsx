import Link from 'next/link'

import { IoChevronBackOutline } from 'react-icons/io5'

import TemplateInfoCard from '../edit/template-info-card'

export default async function TemplatePreviewSidebar() {
  return (
    <div className="sticky top-0 h-screen w-[240px] bg-n-700 text-white">
      <Link href="/admin/form-templates/" className="flex w-fit items-center gap-[4px] p-[8px]">
        <IoChevronBackOutline className="h-[20px] w-[20px]" />
        <span className="text-[16px]">Back</span>
      </Link>
      <TemplateInfoCard />
    </div>
  )
}
