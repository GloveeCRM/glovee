import ClinetPageToolbar from '@/components/admin/dashboard/clients/clients-page-toolbar'
import ClientsTable from '@/components/admin/dashboard/clients/clients-table'

interface ClientsPageProps {
  params: { orgName: string }
  searchParams?: { query?: string }
}

export default async function ClientsPage({ params, searchParams }: ClientsPageProps) {
  const orgName = params.orgName
  const query = searchParams?.query?.trim() || ''

  return (
    <div>
      <h1 className="mb-[22px] text-[24px] font-bold">Clients</h1>
      <ClinetPageToolbar />
      <ClientsTable orgName={orgName} query={query} />
    </div>
  )
}
