import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import ApplicationFormCategoriesContainer from './application-form-categories-container'
import ApplicationFormInfoCard from './application-form-info-card'
import { Separator } from '../ui/separator'

interface ApplicationFormSidebarProps {
  showProgressIndicator: boolean
  backURL: string
}

export default function ApplicationFormSidebar({
  showProgressIndicator,
  backURL,
}: ApplicationFormSidebarProps) {
  return (
    <div
      id="application-form-sidebar"
      className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col gap-[16px] bg-zinc-800 px-[8px] text-white"
    >
      <div id="application-form-sidebar-header" className="flex flex-col gap-[8px]">
        <Link href={backURL} className="flex w-fit items-center gap-[4px] py-[8px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[14px]">Back to Application</span>
        </Link>
        <div className="flex flex-col gap-[6px]">
          <ApplicationFormInfoCard />
          <Separator className="bg-zinc-700" />
        </div>
      </div>
      <ApplicationFormCategoriesContainer showProgressIndicator={showProgressIndicator} />
    </div>
  )
}
