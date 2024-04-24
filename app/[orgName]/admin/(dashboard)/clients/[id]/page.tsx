import { notFound } from 'next/navigation'

import { fetchUserById } from '@/lib/data/user'
import { fetchApplicationsByUserId } from '@/lib/data/application'
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
      <div className="mt-[20px] flex justify-between">
        <h1 className="text-[20px] font-bold">Applications</h1>
        <CreateNewApplicationButton orgName={orgName} client={client} />
      </div>
      <ClientApplicationsTable applications={applications} />
    </div>
  )
}
