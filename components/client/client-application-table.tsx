import { getAuthenticatedUser } from '@/auth'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ApplicationRow from './client-application-table-row'

export default async function ClientApplicationTable() {
  const client = await getAuthenticatedUser()
  const applications = await fetchApplicationsByUserId(client?.id!)

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
          applications.map((application) => (
            <ApplicationRow key={application.id} application={application} />
          ))
        )}
      </tbody>
    </table>
  )
}
