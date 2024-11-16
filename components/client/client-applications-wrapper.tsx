import { getSessionUserID } from '@/lib/auth/session'
import { searchApplications } from '@/lib/data/application'
import ClientApplicationSummaryCard from './application/client-application-summary-card'

export default async function ClientApplicationsWrapper() {
  const userID = await getSessionUserID()
  const { applications } = await searchApplications({
    filters: { userID },
  })

  const hasApplications = applications && applications.length > 0

  return !hasApplications ? (
    <div className="flex h-[calc(100svh-16px)] flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No Applications are assigned to you yet
    </div>
  ) : (
    <div>
      {applications.map((application) => (
        <div className="mb-[16px]" key={application.applicationID}>
          <ClientApplicationSummaryCard application={application} />
        </div>
      ))}
    </div>
  )
}
