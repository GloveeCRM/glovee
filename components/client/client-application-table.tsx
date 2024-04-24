import { getAuthenticatedUser } from '@/auth'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ApplicationRow from './client-application-table-row'
import Table from '../ui/table'

const theaders = ['ID', 'Status']

export default async function ClientApplicationTable() {
  const client = await getAuthenticatedUser()
  const applications = await fetchApplicationsByUserId(client?.id!)

  return applications?.length == 0 ? (
    <div className="flex flex-1 flex-col items-center justify-center text-[20px] text-n-400">
      No applications are assigned to you yet
    </div>
  ) : (
    <Table theaders={theaders} tableName="applications" items={applications!}>
      {applications?.map((application) => (
        <ApplicationRow key={application.id} application={application} />
      ))}
    </Table>
  )
}
