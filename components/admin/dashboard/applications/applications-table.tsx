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

interface ApplicationsTableProps {
  orgName: string
  query: string
}

export default async function ApplicationsTable({ orgName, query }: ApplicationsTableProps) {
  const applications = await searchApplications(orgName, query, 50, 0)

  return (
    <div className="mt-[20px] flex h-full flex-col overflow-auto">
      <div className="overflow-auto">
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
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.id}</TableCell>
                <TableCell>
                  <Link href={`/admin/clients/${application.clientID}`}>
                    <div className="flex items-center gap-[6px]">
                      <div>
                        <Image
                          src={DEFAULT_MALE_CLIENT_LOGO_URL}
                          alt=""
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                      <div>{application.clientID}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{application.templateName}</TableCell>
                <TableCell className="max-w-[100px] truncate">
                  <Badge variant="secondary" className="flex w-fit gap-[2px]">
                    <span className="font-semibold">{application.role}</span>
                    <span>
                      ({application.applicantFirstName} {application.applicantLastName})
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{application.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-red-100">Hi</div>
    </div>
  )
}
