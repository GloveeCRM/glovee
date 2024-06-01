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
import { Badge } from '@/components/ui/badge'
import { Pagination } from '@/components/ui/pagination'

interface ApplicationsTableProps {
  orgName: string
  query?: string
  currentPage?: number
}

export default async function ApplicationsTable({
  orgName,
  query,
  currentPage = 1,
}: ApplicationsTableProps) {
  const totalRowsPerPage = 14
  const { applications, total } = await searchApplications(
    orgName,
    0,
    query,
    totalRowsPerPage,
    currentPage * totalRowsPerPage - totalRowsPerPage
  )
  const totalPages = Math.ceil(total / totalRowsPerPage)

  return (
    <div className="mt-[20px] flex h-full flex-col overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-sm">
          <TableRow>
            <TableHead>Application ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Template</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications && applications.length > 0 ? (
            applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/clients/${application.client.id}`}>
                    <div className="flex w-max items-center gap-[6px] hover:text-blue-500">
                      <Image
                        src={application.client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <div>
                        {application.client.firstName} {application.client.lastName}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-nowrap">{application.templateName}</TableCell>
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
              <TableCell colSpan={5} className="py-[12px] text-center text-n-500">
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
