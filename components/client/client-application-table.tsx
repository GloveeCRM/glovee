import { currentUser } from '@/lib/auth/user'
import { fetchApplicationByUserId } from '@/lib/data/application'

export default async function ClientApplicationTable() {
  const client = await currentUser()
  const applications = await fetchApplicationByUserId(client?.id!)

  return (
    <table className="border-separate border-spacing-2 border border-n-700">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Status</th>
        </tr>
        {applications === null ? (
          <tr>
            <td colSpan={2}>No applications found</td>
          </tr>
        ) : (
          <tr>
            <td>{applications.id}</td>
            <td>{applications.status}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
