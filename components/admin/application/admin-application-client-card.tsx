import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { UserType } from '@/lib/types/user'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AdminApplicationClientCardOptionsContent from './admin-application-client-card-options-content'

interface AdminApplicationClientCardProps {
  client: UserType
}

export default async function AdminApplicationClientCard({
  client,
}: AdminApplicationClientCardProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-fit cursor-pointer items-center gap-[8px]">
          <div className="text-[14px]">
            {client.firstName} {client.lastName}
          </div>
          <Image
            src={client.profilePictureFile?.url || DEFAULT_MALE_CLIENT_LOGO_URL}
            alt="User Profile Picture"
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full"
            draggable={false}
          />
        </div>
      </DropdownMenuTrigger>
      <AdminApplicationClientCardOptionsContent clientID={client.userID} />
    </DropdownMenu>
  )
}
