import AdminApplicationNavLinks from './admin-application-nav-links'

interface AdminApplicationSidebarProps {
  applicationID: number
}

export default function AdminApplicationSidebar({
  applicationID,
}: Readonly<AdminApplicationSidebarProps>) {
  return (
    <div
      id="admin-application-sidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-shrink-0 flex-col gap-[16px] border-r border-sand-500 bg-sand-400 p-[8px]"
    >
      <AdminApplicationNavLinks applicationID={applicationID} />
    </div>
  )
}
