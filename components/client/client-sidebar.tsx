import { logout } from '@/lib/actions/auth'
import NavLinks from './client-nav-links'

export default function ClientSidebar() {
  return (
    <div id="clientSidebar" className="sticky top-0 flex h-screen w-[220px] flex-col bg-gray-500">
      <div className="bg-yellow-500">
        <p>Client</p>
      </div>
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
