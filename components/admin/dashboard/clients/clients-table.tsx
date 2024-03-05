import { fetchClientsByOrgName } from '@/lib/data/clients'

export default async function ClientsTable({ orgName }: { orgName: string }) {
  const clients = await fetchClientsByOrgName(orgName)

  return (
    <table className="border-separate border-spacing-2 border border-n-700">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {clients.length === 0 ? (
          <tr>
            <td colSpan={3}>No clients found</td>
          </tr>
        ) : (
          clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
