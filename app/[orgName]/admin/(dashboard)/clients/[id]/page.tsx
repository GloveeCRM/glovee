import { notFound } from 'next/navigation'

import { fetchClientProfileById } from '@/lib/data/user'
import ClientProfileCard from '@/components/admin/dashboard/clients/client-profile-card'
import ClientApplicationsTable from '@/components/admin/dashboard/clients/client-applications-table'
import CreateNewApplicationButton from '@/components/admin/dashboard/applications/create-new-application-button'

interface ClientPageParams {
  orgName: string
  id: number
}

interface ClientPageSearchParams {
  page?: number
}

interface ClientsPageProps {
  params: ClientPageParams
  searchParams: ClientPageSearchParams
}

export default async function ClientPage({ params, searchParams }: ClientsPageProps) {
  const orgName = params.orgName
  const clientID = params.id
  const currentPage = searchParams.page || 1

  const client = await fetchClientProfileById(clientID, orgName)

  if (!client) {
    notFound()
  }

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ClientProfileCard client={client} />
      <div className="mt-[20px] flex items-end justify-end">
        <CreateNewApplicationButton client={client} />
      </div>
      <ClientApplicationsTable orgName={orgName} clientID={clientID} currentPage={currentPage} />
    </div>
  )
}
