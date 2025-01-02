import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { searchClients } from '@/lib/data/user'

import ClientProfileCard from '@/components/admin/dashboard/clients/client-profile-card'
import ClientApplicationsTable from '@/components/admin/dashboard/clients/client-applications-table'
import AddApplicationButton from '@/components/admin/dashboard/applications/add-application-button'
import ClientApplicationsTableSkeleton from '@/components/skeleton/admin/client-applications-table-skeleton'

interface ClientPageParams {
  clientID: number
}

interface ClientPageProps {
  params: ClientPageParams
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { clientID } = params

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
        <AddApplicationButton client={client} />
      </div>
      <Suspense fallback={<ClientApplicationsTableSkeleton />}>
        <ClientApplicationsTable clientID={clientID} />
      </Suspense>
    </div>
  )
}
