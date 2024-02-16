import { IoChevronBackOutline } from 'react-icons/io5'
import ApplicationCategories from './application-categories'
import Link from 'next/link'
export default function ClientApplicationSidebar({ applicationId }: { applicationId: string }) {
  return (
    <div
      id="clientApplicationSidebar"
      className="sticky top-0 flex h-screen w-[220px] flex-col bg-gray-500"
    >
      <div id="sidebarHeader" className="flex items-center gap-[4px] p-[8px]">
        <IoChevronBackOutline className="h-[20px] w-[20px]" />
        <Link href={`/applications`}>
          <span className="text-[16px]">Back</span>
        </Link>
      </div>
      <ApplicationCategories applicationId={applicationId} className="h-full" />
    </div>
  )
}
