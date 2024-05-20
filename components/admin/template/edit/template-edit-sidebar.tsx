import Link from 'next/link'
import { Suspense } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'

import {
  TemplateEditSidebarCategoryWrapperSkeleton,
  TemplateInfoCardSkeleton,
} from '@/components/skeletons'
import TemplateInfoCard from '../template-info-card'
import TemplateEditSidebarCategoryWrapper from './template-edit-sidebar-category-wrapper'

interface TemplateEditSidebarProps {
  templateID: number
}

export default async function TemplateEditSidebar({ templateID }: TemplateEditSidebarProps) {
  return (
    <div className="z-10 flex h-svh w-[240px] flex-shrink-0 flex-col overflow-x-hidden overflow-y-scroll bg-n-700 px-[8px] text-n-100">
      <div id="sidebar-header" className="sticky top-0 z-10 flex flex-col bg-n-700 py-[6px]">
        <Link href="/admin/templates/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <Suspense fallback={<TemplateInfoCardSkeleton />}>
          <TemplateInfoCard templateID={templateID} editable={true} />
        </Suspense>
      </div>
      <div id="sidebar-categories" className="">
        <Suspense fallback={<TemplateEditSidebarCategoryWrapperSkeleton />}>
          <TemplateEditSidebarCategoryWrapper templateID={templateID} />
        </Suspense>
      </div>
    </div>
  )
}
