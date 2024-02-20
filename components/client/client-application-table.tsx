import { currentUser } from '@/lib/utils/user'
import { fetchApplicationByUserId } from '@/lib/data/application'
import Link from 'next/link'
import { ApplicationStatus } from '@prisma/client'

export default async function ClientApplicationTable() {
  const client = await currentUser()
  const applications = await fetchApplicationByUserId(client?.id!)

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
            <tr key={application.id}>
              <td>
                <Link
                  className="cursor-pointer text-sky-500 underline"
                  href={`/applications/${application.id}`}
                >
                  {application.id}
                </Link>
              </td>
              <td>{application.status}</td>
              {application.status === ApplicationStatus.SUBMITTED ? (
                <td>
                  <button>Submit</button>
                </td>
              ) : (
                <td>
                  <Link href={`/applications/${application.id}`} className="underline">
                    View
                  </Link>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
