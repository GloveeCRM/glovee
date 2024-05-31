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
    <div>
      <ClinetPageToolbar />
      <ClientsTable orgName={orgName} query={query} currentPage={currentPage} />
    </div>
  )
}
