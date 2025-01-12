import { getSessionUserID } from '@/lib/auth/session'
import { searchApplications } from '@/lib/data/application'
import { IoFolder } from 'react-icons/io5'
import ApplicationSummaryCard from './application-summary-card'

export default async function ClientApplicationsContainer() {
  const userID = await getSessionUserID()
  const { applications } = await searchApplications({
    filters: { userID },
  })

  const hasApplications = applications && applications.length > 0

  return !hasApplications ? (
    <div className="flex h-full flex-col items-center justify-center">
      <span className="text-center text-[18px] text-zinc-500">No templates found</span>
      <IoFolder className="h-[300px] w-[300px] text-zinc-700/10" />
    </div>
  ) : (
    <div className="flex flex-col gap-[16px]">
      {applications.map((application) => (
        <ApplicationSummaryCard key={application.applicationID} application={application} />
      ))}
    </div>
  )
}
