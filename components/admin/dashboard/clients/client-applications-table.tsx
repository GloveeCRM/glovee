import { useOrgContext } from '@/contexts/org-context'
import { fetchClientApplications } from '@/lib/data/application'
import { ApplicationType } from '@/lib/types/application'

interface ClientApplicationsTableProps {
  orgName: string
  clientID: number
}

export default async function ClientApplicationsTable({
  orgName,
  clientID,
}: ClientApplicationsTableProps) {
  const applications = await fetchClientApplications(orgName, clientID)

  return (
    <div>
      <table className="mt-[15px] w-full text-[14px]">
        <thead className="border-b-2 border-n-700 text-left">
          <tr>
            <th>Application ID</th>
            <th>Template</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {!applications || applications.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-[12px] text-center text-n-500">
                No applications found
              </td>
            </tr>
          ) : (
            applications.map((application: ApplicationType) => (
              <tr key={application.id}>
                <td className="py-[10px]">{application.id}</td>
                <td>{application.templateName}</td>
                <td>
                  <span className="rounded-full bg-n-300 px-[6px] py-[2px] text-[10px] text-n-700">
                    <span className="font-semibold">{application.role}</span> (
                    {application.applicantFirstName} {application.applicantLastName})
                  </span>
                </td>
                <td>
                  <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
                    {application.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
