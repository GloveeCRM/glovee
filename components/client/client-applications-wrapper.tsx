import { fetchApplicationSummariesByUserId } from '@/lib/data/application'
import ClientApplicationSummaryCard from './client-application-summary-card'
import { ApplicationRole } from '@prisma/client'
import { getSessionPayload } from '@/lib/auth/session'

export default async function ClientApplicationsWrapper() {
  const payload = await getSessionPayload()
  const clientId = String(payload?.user.id)
  const applicationSummaries = await fetchApplicationSummariesByUserId(clientId)

  const hasApplications = applicationSummaries !== null && applicationSummaries?.length > 0

  return !hasApplications ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No applications are assigned to you yet
    </div>
  ) : (
    <div>
      <div>
        <h3 className="font-semibold">Main Applicant</h3>
        {applicationSummaries
          .filter((application) => application.role === ApplicationRole.MAIN)
          .map((application) => (
            <div key={application.id} className="my-[20px]">
              <ClientApplicationSummaryCard applicationSummary={application} />
            </div>
          ))}
      </div>
      <div>
        <h3 className="font-semibold">Dependents</h3>
        {applicationSummaries
          .filter((application) => application.role !== ApplicationRole.MAIN)
          .map((application) => (
            <div key={application.id} className="my-[20px]">
              <ClientApplicationSummaryCard applicationSummary={application} />
            </div>
          ))}
      </div>
    </div>
  )
}
