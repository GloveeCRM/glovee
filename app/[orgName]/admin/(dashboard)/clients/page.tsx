import ClinetPageToolBar from '@/components/admin/dashboard/clients/clients-page-tool-bar'
import ClientsTable from '@/components/admin/dashboard/clients/clients-table'

export default async function ClientsPage({
  params,
  searchParams,
}: {
  params: { orgName: string }
  searchParams?: {
    query?: string
  }
}) {
  const orgName = params.orgName
  const query = searchParams?.query?.trim() || ''

  return (
    <div>
      <h1 className="mb-[22px] text-[24px] font-bold">Clients</h1>
      <ClinetPageToolBar />
      <ClientsTable orgName={orgName} query={query} />
    </div>
  )
}
