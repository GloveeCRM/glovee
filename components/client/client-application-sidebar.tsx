import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import { fetchCategorieByApplicationId } from '@/lib/data/application'
import ApplicantInfoCard from './application/applicant-info-card'
import ApplicationCategoriesCardWrapper from './application-categories-card-wrapper'

interface ClientApplicationSidebarProps {
  applicationId: string
}

export default async function ClientApplicationSidebar({
  applicationId,
}: ClientApplicationSidebarProps) {
  const categories = (await fetchCategorieByApplicationId(applicationId)) || []

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
        <ApplicantInfoCard applicationId={applicationId} />
      </div>
      <ApplicationCategoriesCardWrapper categories={categories} />
    </div>
  )
}
