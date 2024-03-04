import { fetchClientsByOrgName } from '@/lib/data/clients'

export default async function ClientsPage({ params }: { params: { orgName: string } }) {
  const orgName = params.orgName
  const clients = await fetchClientsByOrgName(orgName)
  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">
        {clients.map((client) => (
          <div key={client.id}>{client.email}</div>
        ))}
      </h1>
    </div>
  )
}
