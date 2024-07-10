'use client'

import Image from 'next/image'
import { useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { UserType, UserStatusTypes } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { Badge } from '@/components/ui/badge'
import ClientProfileEditForm from './client-profile-edit-form'
import SetUserStatusButton from './set-user-status-button'
import ClientProfilePicture from './client-profile-picture'

interface ClientProfileCardProps {
  client: UserType
}

export default function ClientProfileCard({ client }: ClientProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  function onCloseEditForm() {
    setIsEditing(false)
  }

  return (
    <div className="flex items-end justify-between rounded-md border border-n-700 bg-n-700 px-[14px] py-[18px] text-n-100">
      <div className="flex gap-[8px]">
        <ClientProfilePicture
          url={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
          client={client}
          editable={isEditing}
        />
        {isEditing ? (
          <ClientProfileEditForm onClose={onCloseEditForm} client={client} />
        ) : (
          <div className="flex gap-[16px]">
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[16px] font-semibold">
                  {client.firstName} {client.lastName}
                </span>
                {client.status === UserStatusTypes.INACTIVE && (
                  <Badge variant="destructive">Not Active</Badge>
                )}
              </div>
              <div className="flex flex-col gap-[6px]">
                <span className="text-[12px]">{client.email}</span>
                <Badge variant="default" size="md" className="bg-n-500 text-n-100">
                  {client.id}
                </Badge>
              </div>
            </div>
            <div>
              <HiOutlinePencilSquare
                className="h-[20px] w-[20px] cursor-pointer transition-all duration-75 hover:ml-[-1px] hover:mt-[-1px] hover:h-[22px] hover:w-[22px]"
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <SetUserStatusButton
          userId={client.id}
          newStatus={
            client.status === UserStatusTypes.ACTIVE
              ? UserStatusTypes.INACTIVE
              : UserStatusTypes.ACTIVE
          }
        />
      </div>
    </div>
  )
}
