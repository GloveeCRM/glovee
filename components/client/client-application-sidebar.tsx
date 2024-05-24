import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import { fetchClientApplicationCategoriesIncludingSections } from '@/lib/data/application'
import ApplicantInfoCard from './application/applicant-info-card'
import ApplicationCategoriesCardWrapper from './application-categories-card-wrapper'
import { getSessionPayload } from '@/lib/auth/session'

interface ClientApplicationSidebarProps {
  orgName: string
  applicationID: number
}

export default async function ClientApplicationSidebar({
  orgName,
  applicationID,
}: ClientApplicationSidebarProps) {
  const payload = await getSessionPayload()
  const userID = payload?.user.id || 0

  const categories = await fetchClientApplicationCategoriesIncludingSections(
    orgName,
    userID,
    applicationID
  )

  return (
    <div
      id="client-application-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col bg-n-700 px-[8px] text-white"
    >
      <div id="sidebarHeader" className="py-[8px]">
        <Link href="/applications/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <ApplicantInfoCard orgName={orgName} applicationID={applicationID} />
      </div>
      <ApplicationCategoriesCardWrapper categories={categories} />
    </div>
  )
}
