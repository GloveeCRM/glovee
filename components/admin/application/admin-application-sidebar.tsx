import Link from 'next/link'

import AdminApplicationNavLinks from './admin-application-nav-links'
import { IoChevronBackOutline } from 'react-icons/io5'

interface AdminApplicationSidebarProps {
  applicationID: number
}

export default function AdminApplicationSidebar({
  applicationID,
}: Readonly<AdminApplicationSidebarProps>) {
  return (
    <div
      id="admin-application-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col gap-[16px] bg-n-700 p-[8px]"
    >
      <div id="admin-application-sidebar-header" data-testid="admin-application-sidebar-header">
        <BackToApplicationsButton />
      </div>
      <AdminApplicationNavLinks applicationID={applicationID} />
    </div>
  )
}

function BackToApplicationsButton() {
  return (
    <Link
      href="/admin/applications"
      className="mb-[8px] flex w-fit items-center gap-[4px] py-[4px] text-n-100"
    >
      <IoChevronBackOutline className="h-[20px] w-[20px]" />
      <span className="text-[16px]">Applications</span>
    </Link>
  )
}
