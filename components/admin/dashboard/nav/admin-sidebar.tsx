import { logout } from '@/lib/actions/auth'
import NavLinks from './admin-nav-links'
import OrgInfoCard from './org-info-card'

export default function AdminSidebar() {
  return (
    <div
      id="adminSidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-col bg-n-700 p-[8px]"
    >
      <OrgInfoCard />
      <div className="h-full">
        <NavLinks />
      </div>
      <div className="bg-blue-300">
        <form action={logout}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    </div>
  )
}
