import { searchForms } from '@/lib/data/form'
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
  const totalRowsPerPage = 12
  const { forms, total } = await searchForms(
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
          {forms && forms.length > 0 ? (
            forms.map((form) => (
              <TableRow key={form.id} className="h-[42px]">
                <TableCell>{form.id}</TableCell>
                <TableCell className="truncate">{form.templateName}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-[2px]">
                    <span className="font-semibold">{form.role}</span>
                    <span className="truncate">
                      ({form.applicant.firstName} {form.applicant.lastName})
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{form.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-[12px] text-center text-n-500">
                No forms found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {forms && forms.length < total && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
