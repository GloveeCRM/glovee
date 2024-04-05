'use client'
import Image from 'next/image'

import { UserStatus } from '@prisma/client'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import DeactiveButton from './deactive-button'
import ActiveButton from './active-button'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { useState } from 'react'
import ClientProfileEdit from './client-profile-edit'

export default function ClientProfileCard({ client, userId }: { client: any; userId: string }) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="flex items-center justify-between rounded-lg border border-n-400 bg-n-100/50 px-[14px] py-[18px]">
      {isEditing ? (
        <ClientProfileEdit setIsEditing={setIsEditing} client={client} />
      ) : (
        <div className="flex gap-[4px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src={client.image || DEFAULT_MALE_CLIENT_LOGO_URL}
              alt="CLient Logo"
              width={75}
              height={75}
              className="rounded-full"
            />
            <div className="text-[16px]">
              <p>{client.name}</p>
              <p>{client.email}</p>
              <p>
                <span className="rounded-full border bg-n-200 px-[6px] py-[2px] text-[12px]">
                  {client.id}
                </span>
              </p>
            </div>
          </div>
          <HiOutlinePencilSquare
            className="h-[20px] w-[20px]"
            onClick={() => setIsEditing(!isEditing)}
          />
        </div>
      )}
      <div>
        {(client.status === UserStatus.ACTIVE && <DeactiveButton CLientId={userId} />) ||
          (client.status === UserStatus.INACTIVE && <ActiveButton CLientId={userId} />)}
      </div>
    </div>
  )
}
