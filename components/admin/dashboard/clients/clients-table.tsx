import { fetchClientsByOrgNameandSearchQuery } from '@/lib/data/user'
import ClientsTableRow from './clients-table-row'

export default async function ClientsTable({ orgName, query }: { orgName: string; query: string }) {
  const clients = await fetchClientsByOrgNameandSearchQuery(orgName, query)

  return (
    <table className="mt-[28px] w-full text-[14px]">
      <tbody>
        <tr className="border-b-2 border-n-700 text-left">
          <th></th>
          <th>Full Name</th>
          <th>Email</th>
          <th>ID</th>
          <th>Status</th>
        </tr>
        {clients.length === 0 ? (
          <td colSpan={5} className="py-[12px] text-center text-n-500">
            No clients found
          </td>
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
