import Link from 'next/link'
import { Suspense } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'

import {
  TemplateEditSidebarCategoriesSkeleton,
  TemplateInfoCardSkeleton,
} from '@/components/skeletons'
import TemplateInfoCard from '../template-info-card'
import TemplateEditSidebarCategories from './template-edit-sidebar-categories'

interface TemplateEditSidebarProps {
  templateId: string
}

export default async function TemplateEditSidebar({ templateId }: TemplateEditSidebarProps) {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-col bg-n-700 p-[8px] text-n-100">
      <div id="sidebar-header" className="flex flex-col">
        <Link href="/admin/templates/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <Suspense fallback={<TemplateInfoCardSkeleton />}>
          <TemplateInfoCard templateId={templateId} editable={true} />
        </Suspense>
      </div>
      <div id="sidebar-categories" className="mt-[6px]">
        <Suspense fallback={<TemplateEditSidebarCategoriesSkeleton />}>
          <TemplateEditSidebarCategories templateId={templateId} />
        </Suspense>
      </div>
    </div>
  )
}
