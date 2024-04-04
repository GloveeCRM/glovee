import { notFound } from 'next/navigation'

import { GoPlus } from 'react-icons/go'
import { fetchUserById } from '@/lib/data/user'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ClientProfile from '@/components/admin/dashboard/clients/client-profile'

interface ClientsPageProps {
  params: { id: string }
}
export default async function ClientPage({ params }: ClientsPageProps) {
  const userId = params.id
  const client = await fetchUserById(userId)
  const applications = await fetchApplicationsByUserId(userId)

  if (!client) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">Client</h1>
      <ClientProfile client={client} userId={userId} />
      <div>
        <div className="mt-[20px] flex justify-between">
          <h1 className="text-[20px] font-bold">Applications</h1>
          <div className="flex cursor-pointer items-center gap-[4px] rounded border border-n-700 py-[5px] pl-[8px] pr-[10px]">
            <GoPlus className="h-[20px] w-[20px]" />
            <span>New Application</span>
          </div>
        </div>
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
              applications.map((application) => (
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
    </div>
  )
}
