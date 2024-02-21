import { submitApplicationById } from '@/lib/actions/application'
import { Application, ApplicationStatus } from '@prisma/client'
import Link from 'next/link'

export default function ApplicationRow({ application }: { application: Application }) {
  const formAction = submitApplicationById.bind(null, application.id)
  return (
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
      {application.status !== ApplicationStatus.SUBMITTED ? (
        <td>
          <form action={formAction}>
            <button>Submit</button>
          </form>
        </td>
      ) : (
        <td>
          <Link href={`/applications/${application.id}`} className="underline">
            View
          </Link>
        </td>
      )}
    </tr>
  )
}
