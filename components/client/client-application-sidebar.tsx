import { IoChevronBackOutline } from 'react-icons/io5'
import ApplicationCategories from './application-categories'
import Link from 'next/link'
export default function ClientApplicationSidebar({ applicationId }: { applicationId: string }) {
  return (
    <div
      id="clientApplicationSidebar"
      className="sticky top-0 h-screen w-[240px] bg-n-700 text-white"
    >
      <div id="sidebarHeader" className="flex items-center gap-[4px]">
        <Link href="/applications/" className="flex w-fit items-center gap-[4px] p-[8px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
      </div>
      <ApplicationCategories applicationId={applicationId} />
    </div>
  )
}
