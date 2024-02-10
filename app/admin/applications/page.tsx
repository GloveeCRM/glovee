import ApplicationsTable from '@/components/admin/applications-table'
import CreateNewApplicationCard from '@/components/admin/create-new-application-card'

export default async function ApplicationsPage() {
  return (
    <div className="p-[8px]">
      <h1 className="mb-[15px] text-[24px] font-bold">Applications</h1>

      <div className="gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateNewApplicationCard />
        <ApplicationsTable />
      </div>
    </div>
  )
}
