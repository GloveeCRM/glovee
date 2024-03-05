import { fetchClientsByOrgName } from '@/lib/data/clients'
import ClientTableRow from './client-table-row'

export default async function ClientsTable({ orgName }: { orgName: string }) {
  const clients = await fetchClientsByOrgName(orgName)

  return (
    <table className="border-separate border-spacing-2 border border-n-700">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
        {clients.length === 0 ? (
          <tr>
            <td colSpan={3}>No clients found</td>
          </tr>
        ) : (
          clients.map((client) => (
            <ClientTableRow
              id={client.id}
              name={client.name!}
              email={client.email!}
              status={client.status}
              key={client.id}
            />
          ))
        )}
      </tbody>
    </table>
  )
}
