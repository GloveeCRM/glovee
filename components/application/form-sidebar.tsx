import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import ApplicationFormCategoriesContainer from '@/components/application/application-form-categories-container'
import ApplicationFormInfoCard from '@/components/application/application-form-info-card'
import { Separator } from '@/components/ui/separator'

interface FormSidebarProps {
  showProgressIndicator: boolean
  backURL: string
  backButtonText: string
}

export default function FormSidebar({
  showProgressIndicator,
  backURL,
  backButtonText,
}: FormSidebarProps) {
  return (
    <div
      id="application-form-sidebar"
      className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col gap-[16px] bg-zinc-800 px-[8px] text-white"
    >
      <div id="application-form-sidebar-header" className="flex flex-col gap-[8px]">
        <Link href={backURL} className="flex w-fit items-center gap-[4px] py-[8px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[14px]">{backButtonText}</span>
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
