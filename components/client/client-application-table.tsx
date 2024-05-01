import { getAuthenticatedUser } from '@/auth'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ApplicationProgressCard from './application-progress-card'

export default async function ClientApplicationTable() {
  const client = await getAuthenticatedUser()
  const clientId = client?.id || ''
  const applications = await fetchApplicationsByUserId(clientId)

  const hasApplications = applications !== null && applications?.length > 0

  return !hasApplications ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No applications are assigned to you yet
    </div>
  ) : (
    <ApplicationProgressCard applications={applications} />
  )
}
