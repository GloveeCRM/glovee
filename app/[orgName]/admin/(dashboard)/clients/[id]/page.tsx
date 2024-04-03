import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchUserById } from '@/lib/data/user'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchApplicationsByUserId } from '@/lib/data/application'

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
      <div className="flex items-center gap-[8px] rounded-lg border border-n-400 bg-n-100/50">
        <Image
          src={client.image || DEFAULT_MALE_CLIENT_LOGO_URL}
          alt="CLient Logo"
          width={75}
          height={75}
          className="rounded-full"
        />
        <div className="text-[16px]">
          <p>{client.name}</p>
          <p>{client.email}</p>
          <p>{client.id}</p>
        </div>
      </div>
      <div>
        <h1 className="mb-[15px] text-[20px] font-bold">Applications</h1>
        <table>
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
                  <td>{application.id}</td>
                  <td>{application.templateName}</td>
                  <td>{`${application.role} (${application.applicantFirstName} ${application.applicantLastName})`}</td>
                  <td>{application.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
