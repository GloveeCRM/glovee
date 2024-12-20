import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import { FormCategoryType } from '@/lib/types/form'
import ApplicantInfoCard from './form/applicant-info-card'
import FormCategoriesCardWrapper from './form-categories-card-wrapper'

interface ClientFormSidebarProps {
  orgName: string
  formID: number
  categories: FormCategoryType[]
  type: 'inProgress' | 'submitted'
}

export default async function ClientFormSidebar({
  orgName,
  formID,
  categories,
  type,
}: ClientFormSidebarProps) {
  return (
    <div
      id="client-form-sidebar"
      className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col bg-n-700 px-[8px] text-white"
    >
      <div id="sidebarHeader" className="py-[8px]">
        <Link href="/applications/" className="mb-[8px] flex w-fit items-center gap-[4px]">
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
        <ApplicantInfoCard orgName={orgName} formID={formID} />
      </div>
      <FormCategoriesCardWrapper categories={categories} type={type} />
    </div>
  )
}
