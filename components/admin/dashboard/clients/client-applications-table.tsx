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
import { Badge } from '@/components/ui/badge'

interface ClientApplicationsTableProps {
  orgName: string
  clientID: number
  currentPage?: number
}

export default async function ClientApplicationsTable({
  orgName,
  clientID,
  currentPage = 1,
}: ClientApplicationsTableProps) {
  const totalRowsPerPage = 10
  const { applications, total } = await searchApplications(
    orgName,
    clientID,
    '',
    totalRowsPerPage,
    currentPage * totalRowsPerPage - totalRowsPerPage
  )
  const totalPages = Math.ceil(total / totalRowsPerPage)

  return (
    <div className="flex h-full flex-col overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-sm">
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications.map((application) => (
              <TableRow key={application.id} className="h-[42px]">
                <TableCell>{application.id}</TableCell>
                <TableCell className="truncate">{application.templateName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-[2px]">
                    <span className="font-semibold">{application.role}</span>
                    <span className="truncate">
                      ({application.applicant.firstName} {application.applicant.lastName})
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{application.status}</Badge>
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
      {applications && applications.length < total && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
