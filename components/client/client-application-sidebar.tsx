import { IoChevronBackOutline } from 'react-icons/io5'
import ApplicationCategories from './application-categories'

import Link from 'next/link'
import ApplicantInfoCard from './application/applicant-info-card'
export default function ClientApplicationSidebar({ applicationId }: { applicationId: string }) {
  return (
    <div
      id="clientapplication-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col bg-n-700 px-[8px] text-white"
    >
      <div id="sidebarHeader" className="py-[8px]">
        <Link href="/applications/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <ApplicantInfoCard applicationId={applicationId} />
      </div>
      <ApplicationCategories applicationId={applicationId} />
    </div>
  )
}
