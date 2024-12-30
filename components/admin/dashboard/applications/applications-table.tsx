import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchApplications } from '@/lib/data/application'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'

import { Pagination } from '@/components/ui/pagination'

interface ApplicationsTableProps {
  searchQuery?: string
  currentPage?: number
}

export default async function ApplicationsTable({
  searchQuery,
  currentPage = 1,
}: ApplicationsTableProps) {
  const totalRowsPerPage = 14
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { applications, totalCount } = await searchApplications({
    searchQuery,
    limit: totalRowsPerPage,
    offset,
  })
  const totalPages = Math.ceil(totalCount / totalRowsPerPage)

  return (
    <div className="border-sand-500 flex h-fit flex-col overflow-auto rounded-md border bg-white px-[12px]">
      <table className="w-full border-collapse text-[14px]">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-[14px]">
            <th className="min-w-[120px] py-[12px] font-medium">Application ID</th>
            <th className="min-w-[208px] py-[12px] pl-[43px] font-medium">Client</th>
            <th className="min-w-[140px] py-[12px] font-medium">Date added</th>
          </tr>
        </thead>
        <tbody>
          {applications && applications.length > 0 ? (
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
                <td className="py-[8px]">
                  <div className="flex items-center gap-[12px]">
                    <Image
                      src={application.owner.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                      draggable={false}
                    />
                    <div className="flex min-w-0 flex-col">
                      <Link
                        href={`/admin/clients/${application.owner.userID}`}
                        className="truncate text-[14px] font-medium hover:underline"
                        draggable={false}
                      >
                        {application.owner.firstName} {application.owner.lastName}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-[8px] text-zinc-600">
                  {application.createdAt &&
                    formatDateToShortMonthDayYearTime({
                      date: application.createdAt,
                      format: 'long',
                      includeTime: false,
                    })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-[24px] text-center text-zinc-600">
                No clients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {applications && applications.length < totalCount && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
