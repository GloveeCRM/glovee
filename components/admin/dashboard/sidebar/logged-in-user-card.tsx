import Image from 'next/image'
import { FaChevronRight } from 'react-icons/fa'

import { fetchCurrentUserProfile } from '@/lib/data/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import LoggedInUserCardOptionsMenuContent from './logged-in-user-card-options-menu-content'

interface LoggedInUserCardProps {
  collapsed?: boolean
}

export default async function LoggedInUserCard({ collapsed }: Readonly<LoggedInUserCardProps>) {
  const { user } = await fetchCurrentUserProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src={user?.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
              alt="User Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
              draggable={false}
            />
            {!collapsed && (
              <div className="truncate text-[14px]">
                {user?.firstName} {user?.lastName}
              </div>
            )}
          </div>
          <div className={`${collapsed && 'text-zinc-500'}`}>
            <FaChevronRight className="h-[16px] w-[16px]" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <LoggedInUserCardOptionsMenuContent />
    </DropdownMenu>
  )
}
