import { notFound } from 'next/navigation'

import { searchClients } from '@/lib/data/user'
import ClientProfileCard from '@/components/admin/dashboard/clients/client-profile-card'
import ClientApplicationsTable from '@/components/admin/dashboard/clients/client-applications-table'
import CreateNewApplicationButton from '@/components/admin/dashboard/applications/create-new-application-button'

interface ClientPageParams {
  clientID: number
}

interface ClientPageSearchParams {
  page?: number
}

interface ClientPageProps {
  params: ClientPageParams
  searchParams: ClientPageSearchParams
}

export default async function ClientPage({ params, searchParams }: ClientPageProps) {
  const clientID = params.clientID
  const currentPage = searchParams.page || 1

  const { clients } = await searchClients({
    filters: { userID: clientID },
    limit: 1,
  })

  if (!clients) {
    notFound()
  }

  const client = clients[0]

  return (
    <div className="flex h-[calc(100svh-16px)] flex-col gap-[8px] overflow-hidden">
      <ClientProfileCard client={client} />
      <div className="mt-[20px] flex items-end justify-end">
        <CreateNewApplicationButton client={client} />
      </div>
      <ClientApplicationsTable clientID={clientID} currentPage={currentPage} />
    </div>
  )
}
