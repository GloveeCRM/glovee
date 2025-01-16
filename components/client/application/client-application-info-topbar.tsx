import { searchApplications } from '@/lib/data/application'

interface ClientApplicationInfoTopbarProps {
  applicationID: number
}

export default async function ClientApplicationInfoTopbar({
  applicationID,
}: ClientApplicationInfoTopbarProps) {
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
    </div>
  )
}
