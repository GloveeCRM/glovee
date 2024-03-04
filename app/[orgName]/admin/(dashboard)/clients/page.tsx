import { fetchClientsByOrgName } from '@/lib/data/clients'

export default async function ClientsPage({ params }: { params: { orgName: string } }) {
  const orgName = params.orgName
  const clients = await fetchClientsByOrgName(orgName)
  return (
    <div className="mb-[15px] text-[24px] font-bold">
      {clients.map((client) => (
        <div key={client.id}>
          <p>{client.name}</p>
          <p>{client.email}</p>
        </div>
      ))}
    </div>
  )
}
