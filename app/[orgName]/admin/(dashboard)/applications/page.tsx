import ApplicationPageToolbar from '@/components/admin/dashboard/applications/applications-page-toolbar'
import ApplicationsTable from '@/components/admin/dashboard/applications/applications-table'
import CreateNewApplicationCard from '@/components/admin/dashboard/applications/create-new-application-card'

export default async function ApplicationsPage() {
  return (
    <div>
      <h1 className="mb-[22px] text-[24px] font-bold">Applications</h1>

      <CreateNewApplicationCard />
      <ApplicationPageToolbar />
      <ApplicationsTable />
    </div>
  )
}
