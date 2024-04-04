import Image from 'next/image'
import { notFound } from 'next/navigation'

import { GoPlus } from 'react-icons/go'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { UserStatus } from '@prisma/client'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchUserById } from '@/lib/data/user'
import { fetchApplicationsByUserId } from '@/lib/data/application'
import ActiveButton from '@/components/admin/dashboard/clients/active-button'
import DeactiveButton from '@/components/admin/dashboard/clients/deactive-button'

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
      <div className="flex items-center justify-between rounded-lg border border-n-400 bg-n-100/50 px-[14px] py-[18px]">
        <div className="flex gap-[4px]">
          <div className="flex items-center gap-[8px]">
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
              <p>
                <span className="rounded-full border bg-n-200 px-[6px] py-[2px] text-[12px]">
                  {client.id}
                </span>
              </p>
            </div>
          </div>
          <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
        </div>
        <div>
          {(client.status === UserStatus.ACTIVE && <DeactiveButton CLientId={userId} />) ||
            (client.status === UserStatus.INACTIVE && <ActiveButton CLientId={userId} />)}
        </div>
      </div>
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
