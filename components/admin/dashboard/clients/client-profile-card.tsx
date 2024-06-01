'use client'

import Image from 'next/image'
import { useState } from 'react'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { UserType, UserStatusTypes } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import ClientProfileEdit from './client-profile-edit'
import SetUserStatusButton from './set-user-status-button'
import { Badge } from '@/components/ui/badge'

interface ClientProfileCardProps {
  client: UserType
}

export default function ClientProfileCard({ client }: ClientProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex items-center justify-between rounded-lg border border-n-400 bg-n-100/50 px-[14px] py-[18px]">
      <div className="flex gap-[8px]">
        <div>
          <Image
            src={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
            alt="CLient Logo"
            width={75}
            height={75}
            className="block rounded-full"
          />
        </div>
        {isEditing ? (
          <ClientProfileEdit setIsEditing={setIsEditing} client={client} />
        ) : (
          <div className="flex gap-[4px]">
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
                <span className="text-[12px] text-n-600">{client.email}</span>
                <Badge variant="default" size="md" className="border-n-400">
                  {client.id}
                </Badge>
              </div>
            </div>
            <div>
              <HiOutlinePencilSquare
                className="h-[20px] w-[20px]"
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <SetUserStatusButton
          userId={client.id}
          currentStatus={client.status}
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
