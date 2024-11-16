import { getSessionPayload } from '@/lib/auth/session'
import { ApplicationUpdateType } from '@/lib/types/application'
import { UserRoleTypes } from '@/lib/types/user'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'

interface ApplicationUpdateProps {
  update: ApplicationUpdateType
}

export default async function ApplicationUpdate({ update }: ApplicationUpdateProps) {
  const payload = await getSessionPayload()
  const updateBy =
    update.createdBy.role === UserRoleTypes.ORG_CLIENT
      ? update.createdBy.userID === payload?.user?.userID
        ? 'You'
        : update.createdBy.firstName + ' ' + update.createdBy.lastName
      : payload?.organization?.orgName
  const updateTitle = update.title + ' by ' + updateBy

  return (
    <div className="flex flex-col gap-[8px] rounded-md border border-slate-400 p-[8px]">
      <div className="text-[14px] font-medium">{updateTitle}</div>
      {update.description && <div className="text-[12px] text-gray-500">{update.description}</div>}
      <div className="text-[12px] text-gray-500">
        {formatDateToShortMonthDayYearTime({ date: update.createdAt })}
      </div>
    </div>
  )
}
