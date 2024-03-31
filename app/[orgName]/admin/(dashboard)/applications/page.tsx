import ApplicationPageToolbar from '@/components/admin/dashboard/applications/applications-page-toolbar'
import ApplicationsTable from '@/components/admin/dashboard/applications/applications-table'

interface ApplicationsPageProps {
  params: { orgName: string }
  searchParams?: { query?: string }
}

export default async function ApplicationsPage({ params, searchParams }: ApplicationsPageProps) {
  const orgName = params.orgName
  const query = searchParams?.query?.trim() || ''

  return (
    <div className="mx-[8px]">
      <h1 className="mb-[22px] text-[24px] font-bold">Applications</h1>
      <ApplicationPageToolbar orgName={orgName} />
      <ApplicationsTable orgName={orgName} query={query} />
    </div>
  )
}
