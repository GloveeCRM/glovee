import { fetchApplicationUpdates } from '@/lib/data/application'

import ApplicationUpdate from './application-update'

interface ApplicationUpdatesWrapperProps {
  applicationID: number
}

export default async function ApplicationUpdatesWrapper({
  applicationID,
}: ApplicationUpdatesWrapperProps) {
  const { updates, error } = await fetchApplicationUpdates({ applicationID })

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="flex w-[300px] flex-col gap-[8px] bg-slate-300 p-[8px]">
      {updates?.map((update) => (
        <ApplicationUpdate update={update} key={update.applicationUpdateID} />
      ))}
    </div>
  )
}
