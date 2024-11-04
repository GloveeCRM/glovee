import ClinetPageToolbar from '@/components/admin/dashboard/clients/clients-page-toolbar'
import ClientsTable from '@/components/admin/dashboard/clients/clients-table'

interface ClientsPageSearchParams {
  query?: string
  page?: number
}

interface ClientsPageProps {
  searchParams: ClientsPageSearchParams
}

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const query = searchParams.query?.trim() || ''
  const currentPage = searchParams.page || 1

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ClinetPageToolbar />
      <ClientsTable query={query} currentPage={currentPage} />
    </div>
  )
}
