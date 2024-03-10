import { fetchClientsByOrgNameandSearchQuery } from '@/lib/data/user'
import ClientsTableRow from './clients-table-row'

export default async function ClientsTable({ orgName, query }: { orgName: string; query: string }) {
  const clients = await fetchClientsByOrgNameandSearchQuery(orgName, query)

  return (
    <table className="w-full">
      <tbody>
        <tr className="border-b-2 border-n-700 text-left">
          <th></th>
          <th>Full Name</th>
          <th>Email</th>
          <th>ID</th>
          <th>Status</th>
        </tr>
        {clients.length === 0 ? (
          <tr>
            <td colSpan={5}>No clients found</td>
          </tr>
        ) : (
          clients.map((client) => (
            <ClientsTableRow
              image={client.image!}
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
