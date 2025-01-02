'use client'

import { useState } from 'react'

import { UserType, UserStatusTypes } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import ClientProfilePicture from './client-profile-picture'
import EditClientProfileButton from './edit-client-profile-button'

interface ClientProfileCardProps {
  client: UserType
}

export default function ClientProfileCard({ client }: ClientProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  function onCloseEditForm() {
    setIsEditing(false)
  }

  return (
    <div className="group/client-profile-card flex justify-between rounded-md bg-zinc-800 p-[14px] text-white">
      <div className="flex w-full gap-[16px]">
        <ClientProfilePicture
          url={client.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
          clientID={client.userID}
          editable={isEditing}
        />
        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <span className="flex-shrink-0 truncate text-[16px] font-medium">
              {client.firstName} {client.lastName}
            </span>
            {client.status == UserStatusTypes.INACTIVE ? (
              <div className="bg-coral-900 w-fit flex-shrink-0 rounded-full px-[8px] py-[1px] text-[10px]">
                Not Active
              </div>
            ) : (
              <div className="w-fit flex-shrink-0 rounded-full bg-teal-800 px-[8px] py-[1px] text-[10px]">
                Active
              </div>
            )}
          </div>
          <span className="text-[14px] text-zinc-200">{client.email}</span>
          <div className="w-fit rounded-full bg-zinc-700 px-[8px] py-[1px] text-[12px]">
            {client.userID}
          </div>
        </div>
      </div>
      <EditClientProfileButton client={client} />
    </div>
  )
}
