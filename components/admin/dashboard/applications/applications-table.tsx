import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchApplications } from '@/lib/data/application'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/ui/pagination'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'

interface ApplicationsTableProps {
  query?: string
  currentPage?: number
}

export default async function ApplicationsTable({
  query,
  currentPage = 1,
}: ApplicationsTableProps) {
  const totalRowsPerPage = 14
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { applications, totalCount } = await searchApplications({
    query,
    limit: totalRowsPerPage,
    offset,
  })
  const totalPages = Math.ceil(totalCount / totalRowsPerPage)

  return (
    <div className="mt-[20px] flex h-full flex-col overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-sm">
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications.map((application) => (
              <TableRow key={application.applicationID}>
                <TableCell>
                  <Link href={`/admin/application/${application.applicationID}/forms`}>
                    <span className="cursor-pointer hover:text-blue-500">
                      {application.applicationID}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/clients/${application.owner.id}`}>
                    <div className="flex w-max items-center gap-[6px] hover:text-blue-500">
                      <Image
                        src={application.owner.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <div>
                        {application.owner.firstName} {application.owner.lastName}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-nowrap">
                  {formatDateToShortMonthDayYearTime({ date: application.createdAt })}
                </TableCell>
                <TableCell className="text-nowrap">
                  {formatDateToShortMonthDayYearTime({ date: application.updatedAt })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-[12px] text-center text-n-500">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {applications && applications.length < totalCount && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
