import ApplicationPageToolbar from '@/components/admin/dashboard/applications/applications-page-toolbar'
import ApplicationsTable from '@/components/admin/dashboard/applications/applications-table'

interface ApplicationsPageProps {
  params: { orgName: string }
}

export default async function ApplicationsPage({ params }: ApplicationsPageProps) {
  const orgName = params.orgName

  return (
    <div>
      <h1 className="mb-[22px] text-[24px] font-bold">Applications</h1>
      <ApplicationPageToolbar orgName={orgName} />
      <ApplicationsTable />
    </div>
  )
}
