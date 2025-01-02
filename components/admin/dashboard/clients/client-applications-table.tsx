import Link from 'next/link'

import { searchApplications } from '@/lib/data/application'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'

interface ClientApplicationsTableProps {
  clientID: number
}

export default async function ClientApplicationsTable({ clientID }: ClientApplicationsTableProps) {
  const { applications } = await searchApplications({
    filters: { userID: clientID },
    limit: 100,
  })

  const hasApplications = applications && applications.length > 0

  return (
    <div className="border-sand-500 flex h-fit flex-col overflow-auto rounded-md border bg-white px-[12px]">
      <table className="w-full border-collapse text-[14px]">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-[14px]">
            <th className="min-w-[120px] py-[12px] font-medium">Application ID</th>
            <th className="min-w-[140px] py-[12px] font-medium">Created At</th>
            <th className="min-w-[140px] py-[12px] font-medium">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {hasApplications ? (
            applications.map((application, index) => (
              <tr
                key={application.applicationID}
                className={`hover:bg-sand-200 text-left ${applications.length !== index + 1 && 'border-b'}`}
              >
                <td className="py-[8px] text-zinc-600">
                  <Link
                    href={`/admin/application/${application.applicationID}/forms`}
                    className="hover:text-zinc-900 hover:underline"
                    draggable={false}
                  >
                    {application.applicationID}
                  </Link>
                </td>
                <td className="py-[8px] text-zinc-600">
                  {application.createdAt &&
                    formatDateToShortMonthDayYearTime({
                      date: application.createdAt,
                      format: 'long',
                      includeTime: false,
                    })}
                </td>
                <td className="py-[8px] text-zinc-600">
                  {application.updatedAt &&
                    formatDateToShortMonthDayYearTime({
                      date: application.updatedAt,
                      format: 'long',
                      includeTime: false,
                    })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-[24px] text-center text-zinc-600">
                No applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
