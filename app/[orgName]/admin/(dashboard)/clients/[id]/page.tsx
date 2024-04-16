import { notFound } from 'next/navigation'

import { fetchUserById } from '@/lib/data/user'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ClientProfileCard from '@/components/admin/dashboard/clients/client-profile-card'
import ClientApplicationsTable from '@/components/admin/dashboard/clients/client-applications-table'

interface ClientsPageProps {
  params: { id: string }
}
export default async function ClientPage({ params }: ClientsPageProps) {
  const userId = params.id
  const client = await fetchUserById(userId)
  const applications = await fetchApplicationsByUserId(userId)

  if (!client) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">Client</h1>
      <ClientProfileCard client={client} userId={userId} />
      <ClientApplicationsTable applications={applications} />
    </div>
  )
}
