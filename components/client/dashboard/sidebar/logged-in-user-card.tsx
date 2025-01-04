import Image from 'next/image'
import { FaChevronRight } from 'react-icons/fa'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchCurrentUserProfile } from '@/lib/data/user'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import LoggedInUserCardPopoverContent from './logged-in-user-card-popover-content'

export default async function LoggedInUserCard() {
  const { user } = await fetchCurrentUserProfile()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center justify-between gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src={user?.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
              alt="User Profile Picture"
              width={40}
              height={40}
              className="h-[40px] w-[40px] rounded-full"
              draggable={false}
            />
            <div className="truncate text-[14px]">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
          <div>
            <FaChevronRight className="h-[16px] w-[16px]" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={12}
        align="end"
        alignOffset={-6}
        className="w-[180px] bg-zinc-800 p-[4px]"
      >
        <LoggedInUserCardPopoverContent />
      </PopoverContent>
    </Popover>
  )
}
