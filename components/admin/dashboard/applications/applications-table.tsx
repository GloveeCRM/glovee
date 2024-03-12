import { fetchApplications } from '@/lib/data/application'
import ApplicationsTableRow from './applications-table-row'

export default async function ApplicationsTable() {
  const applications = await fetchApplications()
  return (
    <table className="mt-[28px] w-full text-[14px]">
      <tbody>
        <tr className="border-b-2 border-n-700 text-left">
          <th>Application ID</th>
          <th>Client</th>
          <th>Template</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
        {applications.length === 0 ? (
          <tr>
            <td colSpan={5}>No applications found</td>
          </tr>
        ) : (
          applications.map((application) => (
            <ApplicationsTableRow
              id={application.id}
              clientName={application.client.name!}
              templateName={application.templateName}
              role={application.role}
              status={application.status}
              key={application.id}
            />
          ))
        )}
      </tbody>
    </table>
  )
}
