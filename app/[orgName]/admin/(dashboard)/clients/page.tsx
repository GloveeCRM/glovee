import ClientsTable from '@/components/admin/dashboard/clients/clients-table'

export default async function ClientsPage({ params }: { params: { orgName: string } }) {
  const orgName = params.orgName
  return <ClientsTable orgName={orgName} />
}
