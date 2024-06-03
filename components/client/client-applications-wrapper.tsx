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

  const mainApplications = applications?.filter(
    (application) => application.role === ApplicationRoleTypes.MAIN
  )
  const dependentApplications = applications?.filter(
    (application) => application.role !== ApplicationRoleTypes.MAIN
  )

  return !hasApplications ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No applications are assigned to you yet
    </div>
  ) : (
    <div>
      {mainApplications && (
        <div className="mb-[20px]">
          <h3 className="mb-[12px] font-medium">Main Applicant</h3>
          {mainApplications.map((application) => (
            <div className="px-[8px]" key={application.id}>
              <ClientApplicationSummaryCard application={application} />
            </div>
          ))}
        </div>
      )}
      {dependentApplications && (
        <div>
          <h3 className="mb-[12px] font-medium">Dependents</h3>
          {dependentApplications.map((application) => (
            <div className="mb-[16px] px-[8px]" key={application.id}>
              <ClientApplicationSummaryCard application={application} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
