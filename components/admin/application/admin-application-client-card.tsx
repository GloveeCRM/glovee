import Image from 'next/image'

import { fetchApplicationOwnerProfile, searchClients } from '@/lib/data/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AdminApplicationClientCardOptionsContent from './admin-application-client-card-options-content'

interface AdminApplicationClientCardProps {
  applicationID: number
}

export default async function AdminApplicationClientCard({
  applicationID,
}: AdminApplicationClientCardProps) {
  const { user: client } = await fetchApplicationOwnerProfile({
    applicationID,
  })

  if (!client) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-fit cursor-pointer items-center gap-[8px]">
          <div className="text-[14px]">
            {client.firstName} {client.lastName}
          </div>
          <Image
            src={client.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
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
