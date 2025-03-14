import { Suspense } from 'react'

import ApplicationsTable from '@/components/admin/dashboard/applications/applications-table'
import ApplicationPageToolbar from '@/components/admin/dashboard/applications/applications-page-toolbar'
import ApplicationsTableSkeleton from '@/components/skeleton/admin/applications-table-skeleton'

interface ApplicationsPageSearchParams {
  query?: string
  page?: string
}

interface ApplicationsPageProps {
  searchParams: ApplicationsPageSearchParams
}

export default function ApplicationsPage({ searchParams }: ApplicationsPageProps) {
  const query = searchParams.query?.trim() || ''
  const currentPage = Number(searchParams.page) || 1

  const searchKey = `applications-${query}-${currentPage}`

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ApplicationPageToolbar />
      <Suspense key={searchKey} fallback={<ApplicationsTableSkeleton />}>
        <ApplicationsTable searchQuery={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
