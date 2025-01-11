import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import ApplicationFormCategoriesContainer from './application-form-categories-container'

interface ApplicationFormSidebarProps {
  applicationID: number
  applicationFormID: number
  showProgressIndicator: boolean
}

export default function ApplicationFormSidebar({
  applicationID,
  applicationFormID,
  showProgressIndicator,
}: ApplicationFormSidebarProps) {
  return (
    <div
      id="client-form-sidebar"
      className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col bg-zinc-800 px-[8px] text-white"
    >
      <div id="sidebarHeader" className="py-[8px]">
        <Link
          href={`/admin/application/${applicationID}/forms`}
          className="mb-[8px] flex w-fit items-center gap-[4px]"
        >
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[14px]">Back to Application</span>
        </Link>
      </div>
      <ApplicationFormCategoriesContainer showProgressIndicator={showProgressIndicator} />
    </div>
  )
}
