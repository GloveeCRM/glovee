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
  )
}
