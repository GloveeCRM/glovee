import ClinetPageToolbar from '@/components/admin/dashboard/clients/clients-page-toolbar'
import ClientsTable from '@/components/admin/dashboard/clients/clients-table'

interface ClientsPageParams {
  orgName: string
}

interface ClientsPageSearchParams {
  query?: string
  page?: number
}

interface ClientsPageProps {
  params: ClientsPageParams
  searchParams: ClientsPageSearchParams
}

export default async function ClientsPage({ params, searchParams }: ClientsPageProps) {
  const orgName = params.orgName
  const query = searchParams.query?.trim() || ''
  const currentPage = searchParams.page || 1

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ClinetPageToolbar />
      <ClientsTable orgName={orgName} query={query} currentPage={currentPage} />
    </div>
  )
}
