import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchForms } from '@/lib/data/form'
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
  const { forms, total } = await searchForms(
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
          {forms && forms.length > 0 ? (
            forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/clients/${form.client.id}`}>
                    <div className="flex w-max items-center gap-[6px] hover:text-blue-500">
                      <Image
                        src={form.client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <div>
                        {form.client.firstName} {form.client.lastName}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-nowrap">{form.templateName}</TableCell>
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
              <TableCell colSpan={5} className="py-[12px] text-center text-n-500">
                No applications found
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
