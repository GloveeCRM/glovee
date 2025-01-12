import { searchApplications } from '@/lib/data/application'

import AdminApplicationClientCard from './admin-application-client-card'

interface AdminApplicationInfoTopbarProps {
  applicationID: number
}

export default async function AdminApplicationInfoTopbar({
  applicationID,
}: AdminApplicationInfoTopbarProps) {
  const { applications } = await searchApplications({
    filters: {
      applicationID,
    },
  })

  if (!applications || applications.length === 0) return null
  const application = applications[0]

  return (
    <div className="flex w-full items-center justify-between gap-[8px]">
      <span className="text-[14px] font-semibold">{application.applicationName}</span>
      <AdminApplicationClientCard client={application.owner} />
    </div>
  )
}
