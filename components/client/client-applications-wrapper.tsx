import { ApplicationRoleTypes } from '@/lib/types/application'
import { fetchClientApplications } from '@/lib/data/application'
import ClientApplicationSummaryCard from './client-application-summary-card'
import { getSessionPayload } from '@/lib/auth/session'

interface ClientApplicationsWrapperProps {
  orgName: string
}

export default async function ClientApplicationsWrapper({
  orgName,
}: ClientApplicationsWrapperProps) {
  const payload = await getSessionPayload()
  const clientID = payload?.user.id || 0
  const applications = await fetchClientApplications(orgName, clientID)

  const hasApplications = applications !== null && applications?.length > 0

  return !hasApplications ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No applications are assigned to you yet
    </div>
  ) : (
    <div>
      <div>
        <h3 className="font-semibold">Main Applicant</h3>
        {applications
          .filter((application) => application.role === ApplicationRoleTypes.MAIN)
          .map((application) => (
            <div key={application.id} className="my-[20px]">
              <ClientApplicationSummaryCard application={application} />
            </div>
          ))}
      </div>
      <div>
        <h3 className="font-semibold">Dependents</h3>
        {applications
          .filter((application) => application.role !== ApplicationRoleTypes.MAIN)
          .map((application) => (
            <div key={application.id} className="my-[20px]">
              <ClientApplicationSummaryCard application={application} />
            </div>
          ))}
      </div>
    </div>
  )
}
