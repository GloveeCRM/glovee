import Image from 'next/image'

import { logout } from '@/lib/actions/auth'
import NavLinks from './admin-nav-links'

export default function AdminSidebar() {
  return (
    <div
      id="adminSidebar"
      className="sticky top-0 flex h-screen w-[230px] flex-col bg-n-700 p-[8px]"
    >
      <div
        id="org-info"
        className="flex items-center gap-[8px] rounded-md bg-n-600 p-[6px] text-[14px] font-semibold text-n-100"
      >
        <Image
          src="https://be8lvzzwj1r921za.public.blob.vercel-storage.com/calver-logo-oubsyhP5ERck6V1tCa1Xgq75pcFoKF.png"
          alt="f"
          width={65}
          height={65}
          className="rounded-full"
        />
        <h1>Calver Immigration Consulting Inc.</h1>
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
