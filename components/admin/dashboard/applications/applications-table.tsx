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

interface ApplicationsTableProps {
  orgName: string
  query: string
}

export default async function ApplicationsTable({ orgName, query }: ApplicationsTableProps) {
  const applications = await searchApplications(orgName, query)

  return (
    <div className="mt-[20px] h-full overflow-auto">
      <Table>
        <TableHeader>
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
                  <div className="flex items-end gap-[6px]">
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
                <span className="rounded-full bg-n-300 px-[6px] py-[2px] text-[10px] text-n-700">
                  <span className="font-semibold">
                    {application.role} ({application.applicantFirstName}{' '}
                    {application.applicantLastName})
                  </span>
                </span>
              </TableCell>
              <TableCell>
                <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
                  {application.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
