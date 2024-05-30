import ApplicationPageToolbar from '@/components/admin/dashboard/applications/applications-page-toolbar'
import ApplicationsTable from '@/components/admin/dashboard/applications/applications-table'

interface ApplicationsPageParams {
  orgName: string
}

interface ApplicationsPageSearchParams {
  query?: string
}

interface ApplicationsPageProps {
  params: ApplicationsPageParams
  searchParams: ApplicationsPageSearchParams
}

export default function ApplicationsPage({ params, searchParams }: ApplicationsPageProps) {
  const orgName = params.orgName
  const query = searchParams.query?.trim() || ''

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ApplicationPageToolbar orgName={orgName} />
      <ApplicationsTable orgName={orgName} query={query} />
    </div>
  )
}
