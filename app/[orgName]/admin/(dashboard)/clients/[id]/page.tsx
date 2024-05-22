import { notFound } from 'next/navigation'

import { fetchClientProfileById } from '@/lib/data/user'
import ClientProfileCard from '@/components/admin/dashboard/clients/client-profile-card'
import ClientApplicationsTable from '@/components/admin/dashboard/clients/client-applications-table'
import CreateNewApplicationButton from '@/components/admin/dashboard/applications/create-new-application-button'

interface ClientsPageProps {
  params: {
    id: string
    orgName: string
  }
}
export default async function ClientPage({ params }: ClientsPageProps) {
  const orgName = params.orgName
  const clientID = parseInt(params.id)
  const client = await fetchClientProfileById(clientID, orgName)

  if (!client) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">Client</h1>
      <ClientProfileCard client={client} />
      <div className="mt-[20px] flex justify-between">
        <h1 className="text-[20px] font-bold">Applications</h1>
        <CreateNewApplicationButton orgName={orgName} client={client} />
      </div>
      <ClientApplicationsTable clientID={clientID} />
    </div>
  )
}
