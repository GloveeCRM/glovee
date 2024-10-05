import ApplicationsTable from '@/components/admin/dashboard/applications-v2/applications-table'
import ApplicationPageToolbar from '@/components/admin/dashboard/applications-v2/applications-page-toolbar'

interface ApplicationsPageSearchParams {
  query?: string
  page?: number
}

interface ApplicationsPageProps {
  searchParams: ApplicationsPageSearchParams
}

export default function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
  const query = searchParams.query?.trim() || ''
  const currentPage = searchParams.page || 1

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ApplicationPageToolbar />
      <ApplicationsTable query={query} currentPage={currentPage} />
    </div>
  )
}
