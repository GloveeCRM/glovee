import Link from 'next/link'
import ClientApplicationNavLinks from './client-application-nav-links'
import { IoChevronBackOutline } from 'react-icons/io5'

interface ClientApplicationSidebarProps {
  applicationID: number
}

export default function ClientApplicationSidebar({
  applicationID,
}: Readonly<ClientApplicationSidebarProps>) {
  return (
    <div
      id="client-application-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col gap-[16px] bg-n-700 p-[8px]"
    >
      <div id="client-application-sidebar-header" data-testid="client-application-sidebar-header">
        <BackToDashboardButton />
      </div>
      <ClientApplicationNavLinks applicationID={applicationID} />
    </div>
  )
}

function BackToDashboardButton() {
  return (
    <Link
      href="/applications"
      className="mb-[8px] flex w-fit items-center gap-[4px] py-[4px] text-n-100"
    >
      <IoChevronBackOutline className="h-[20px] w-[20px]" />
      <span className="text-[16px]">Dashboard</span>
    </Link>
  )
}
