import Image from 'next/image'

import { dictionary } from '@/lib/constants/dictionary'
import { ApplicationUpdateType } from '@/lib/types/application'
import { UserRoleTypes } from '@/lib/types/user'
import { getSessionPayload } from '@/lib/auth/session'
import { formatDateToShortMonthDayYearTime, getTimeAgo } from '@/lib/utils/date'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

interface ApplicationUpdateProps {
  update: ApplicationUpdateType
}

export default async function ApplicationUpdate({ update }: ApplicationUpdateProps) {
  const payload = await getSessionPayload()
  const isUpdateByClient = update.createdBy.role === UserRoleTypes.ORG_CLIENT
  const isUpdateByCurrentUser =
    isUpdateByClient && update.createdBy.userID === payload?.user?.userID
  const updateUserFormattedName =
    update.createdBy.firstName.charAt(0).toUpperCase() +
    update.createdBy.firstName.slice(1).toLowerCase() +
    ' ' +
    update.createdBy.lastName.charAt(0).toUpperCase() +
    update.createdBy.lastName.slice(1).toLowerCase()
  const formattedOrganizationName =
    payload?.organization?.orgName.charAt(0).toUpperCase() +
    payload?.organization?.orgName.slice(1).toLowerCase()

  const updatePersonTitle = isUpdateByClient
    ? isUpdateByCurrentUser
      ? 'You'
      : updateUserFormattedName
    : formattedOrganizationName

  return (
    <div className="flex gap-[8px] rounded-md border border-sand-500 bg-white p-[8px] shadow-sm">
      <Image
        src={update.createdBy.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
        alt=""
        width={30}
        height={30}
        className="h-[30px] w-[30px] rounded-full"
      />
      <div className="flex flex-1 flex-col gap-[12px] text-[14px]">
        <div className="ext-[14px]">
          <span className="font-semibold">{updatePersonTitle}</span>{' '}
          <span className="font-light text-zinc-600">{dictionary(update.title)} </span>
        </div>
        {update.description && (
          <div className="text-[12px] text-zinc-500">{update.description}</div>
        )}
        <div className="flex justify-between text-[12px] text-zinc-500">
          <span>{formatDateToShortMonthDayYearTime({ date: update.createdAt })}</span>
          <span>{getTimeAgo(update.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
