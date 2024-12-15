import Link from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'

import FormCategoriesCardWrapper from './form-categories-card-wrapper'

interface ClientFormSidebarProps {
  applicationID: number
  type: 'in-progress' | 'submitted'
}

export default async function ClientFormSidebar({ applicationID, type }: ClientFormSidebarProps) {
  return (
    <div
      id="client-form-sidebar"
      className="sticky top-0 flex h-screen w-[260px] flex-shrink-0 flex-col bg-n-700 px-[8px] text-white"
    >
      <div id="sidebarHeader" className="py-[8px]">
        <Link
          href={`/application/${applicationID}/forms`}
          className="mb-[8px] flex w-fit items-center gap-[4px]"
        >
          <IoChevronBackOutline className="h-[20px] w-[20px]" />
          <span className="text-[16px]">Back</span>
        </Link>
      </div>
      <FormCategoriesCardWrapper type={type} />
    </div>
  )
}
