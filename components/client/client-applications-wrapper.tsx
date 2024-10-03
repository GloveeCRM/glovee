import { getSessionUserID } from '@/lib/auth/session'
import { fetchApplicationsByUserID } from '@/lib/data/application'
import ClientApplicationSummaryCard from './client-application-summary-card'

export default async function ClientApplicationsWrapper() {
  const userID = await getSessionUserID()
  const applications = await fetchApplicationsByUserID(userID)
  console.log(applications)

  const hasApplications = applications && applications?.length > 0

  return !hasApplications ? (
    <div className="flex h-[calc(100svh-16px)] flex-1 flex-col items-center justify-center text-[20px] text-n-500">
      No Applications are assigned to you yet
    </div>
  ) : (
    <div>
      <div className="mb-[20px]">
        <h3 className="mb-[12px] font-medium">Main Applicant</h3>
        {applications.map((application) => (
          <div className="mb-[16px] px-[8px]" key={application.applicationID}>
            <ClientApplicationSummaryCard application={application} />
          </div>
        ))}
      </div>
    </div>
  )
}
