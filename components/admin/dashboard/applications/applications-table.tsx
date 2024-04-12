import { fetchApplicationByOrgNameandSearchQuery } from '@/lib/data/application'
import ApplicationsTableRow from './applications-table-row'
import Table from '@/components/ui/table'

interface ApplicationsTableProps {
  orgName: string
  query: string
}

const headers = ['Application ID', 'Client', 'Template', 'Role', 'Status']

export default async function ApplicationsTable({ orgName, query }: ApplicationsTableProps) {
  const applications = await fetchApplicationByOrgNameandSearchQuery(orgName, query)
  return (
    <Table theaders={headers} tableName="applications" items={applications}>
      {applications.map((application) => (
        <ApplicationsTableRow
          id={application.id}
          clientName={application.client.name!}
          templateName={application.templateName}
          role={application.role}
          status={application.status}
          key={application.id}
          applicantFirstName={application.applicantFirstName}
          applicantLastName={application.applicantLastName}
        />
      ))}
    </Table>

    // <table className="mt-[28px] w-full text-[14px]">
    //   <tbody>
    //     <tr className="border-b-2 border-n-700 text-left">
    //       <th>Application ID</th>
    //       <th>Client</th>
    //       <th>Template</th>
    //       <th>Role</th>
    //       <th>Status</th>
    //     </tr>
    //     {applications.length === 0 ? (
    //       <tr>
    //         <td colSpan={5} className="py-[12px] text-center text-n-500">
    //           No applications found
    //         </td>
    //       </tr>
    //     ) : (
    //       applications.map((application) => (
    //         <ApplicationsTableRow
    //           id={application.id}
    //           clientName={application.client.name!}
    //           templateName={application.templateName}
    //           role={application.role}
    //           status={application.status}
    //           key={application.id}
    //           applicantFirstName={application.applicantFirstName}
    //           applicantLastName={application.applicantLastName}
    //         />
    //       ))
    //     )}
    //   </tbody>
    // </table>
  )
}
