import Link from 'next/link'

import { searchApplicationsOld } from '@/lib/data/application'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/ui/pagination'

interface ClientApplicationsTableProps {
  clientID: number
  currentPage?: number
}

export default async function ClientApplicationsTable({
  clientID,
  currentPage = 1,
}: ClientApplicationsTableProps) {
  const totalRowsPerPage = 12
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { applications, totalCount } = await searchApplicationsOld({
    filters: { userID: clientID },
    limit: totalRowsPerPage,
    offset: offset,
  })
  const totalPages = Math.ceil(totalCount / totalRowsPerPage)

  const hasApplications = applications && applications.length > 0

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-sm">
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasApplications ? (
            applications.map((application) => (
              <TableRow key={application.applicationID} className="h-[42px]">
                <TableCell>
                  <Link href={`/admin/application/${application.applicationID}`}>
                    <span className="cursor-pointer hover:text-blue-500">
                      {application.applicationID}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span>{formatDateToShortMonthDayYearTime({ date: application.createdAt })}</span>
                </TableCell>
                <TableCell>
                  <span>{formatDateToShortMonthDayYearTime({ date: application.updatedAt })}</span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="py-[12px] text-center text-n-500">
                No forms found
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
