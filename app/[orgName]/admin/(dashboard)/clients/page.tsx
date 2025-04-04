import { Suspense } from 'react'

import ClinetPageToolbar from '@/components/admin/dashboard/clients/clients-page-toolbar'
import ClientsTable from '@/components/admin/dashboard/clients/clients-table'
import ClientsTableSkeleton from '@/components/skeleton/admin/clients-table-skeleton'

interface ClientsPageSearchParams {
  query?: string
  page?: string
}

interface ClientsPageProps {
  searchParams: ClientsPageSearchParams
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const query = searchParams.query?.trim() || ''
  const currentPage = Number(searchParams.page) || 1

  const searchKey = `clients-${query}-${currentPage}`

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[18px] overflow-hidden">
      <ClinetPageToolbar />
      <Suspense key={searchKey} fallback={<ClientsTableSkeleton />}>
        <ClientsTable searchQuery={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
