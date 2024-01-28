import NavLinks from './nav-links'

export default function AdminSidebar() {
  return (
    <div id="adminSidebar" className="sticky top-0 flex h-screen w-[180px] flex-col bg-gray-500">
      <div className="bg-yellow-500">
        <p>Admin</p>
      </div>
      <div className="h-full">
        <NavLinks />
      </div>
      <div className="bg-blue-300">
        <p>Logout</p>
      </div>
    </div>
  )
}
