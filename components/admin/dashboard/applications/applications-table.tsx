import { fetchApplications } from '@/lib/data/application'

export default async function ApplicationsTable() {
  const applications = await fetchApplications()
  return (
    <table className="border-separate border-spacing-2 border border-n-700">
      <tbody>
        <tr>
          <th>ID</th>
          <th>Client</th>
          <th>Status</th>
        </tr>
        {applications.length === 0 ? (
          <tr>
            <td colSpan={3}>No applications found</td>
          </tr>
        ) : (
          applications.map((application) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.client.email}</td>
              <td>{application.status}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
