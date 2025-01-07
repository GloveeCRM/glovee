import { fetchApplicationUpdates } from '@/lib/data/application'

import ApplicationUpdate from './application-update'

interface ApplicationUpdatesContainerProps {
  applicationID: number
}

export default async function ApplicationUpdatesContainer({
  applicationID,
}: ApplicationUpdatesContainerProps) {
  const { updates, error } = await fetchApplicationUpdates({ applicationID })

  if (error) {
    console.error(error)
  }

  return (
    <div className="flex w-[300px] flex-col gap-[8px] overflow-y-auto border-l border-sand-500 bg-sand-400 p-[8px]">
      {updates?.map((update) => (
        <ApplicationUpdate update={update} key={update.applicationUpdateID} />
      ))}
    </div>
  )
}
