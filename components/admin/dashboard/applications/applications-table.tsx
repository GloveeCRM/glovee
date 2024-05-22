import Link from 'next/link'

import Image from 'next/image'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { ApplicationType } from '@/lib/types/application'
import { Table, THead, TR, TH, TBody, TD } from '@/components/ui/table'
import { searchApplications } from '@/lib/data/application'

interface ApplicationsTableProps {
  orgName: string
  query: string
}

export default async function ApplicationsTable({ orgName, query }: ApplicationsTableProps) {
  const applications = await searchApplications(orgName, query)

  return (
    <Table className="mt-[20px]">
      <THead>
        <TR>
          <TH>ApplicationID</TH>
          <TH>Client</TH>
          <TH>Template</TH>
          <TH>Role</TH>
          <TH>Status</TH>
        </TR>
      </THead>
      <TBody>
        {applications &&
          (applications.length === 0 ? (
            <TR>
              <TD className="py-[12px] text-center text-n-500" colSpan={5}>
                No applications found
              </TD>
            </TR>
          ) : (
            applications.map((application) => (
              <ApplicationsTableRow application={application} key={application.id} />
            ))
          ))}
      </TBody>
    </Table>
  )
}

interface ApplicationsTableRowProps {
  application: ApplicationType
}

function ApplicationsTableRow({ application }: ApplicationsTableRowProps) {
  return (
    <TR className="hover:bg-n-100">
      <TD>
        <Link
          className="cursor-pointer font-medium hover:text-blue-600"
          href={`/admin/application/${application.id}`}
        >
          {application.id}
        </Link>
      </TD>
      <TD>
        <Link
          className="cursor-pointer font-medium hover:text-blue-600"
          href={`/admin/clients/${application.clientID}`}
        >
          <div className="flex items-end gap-[6px]">
            <div>
              <Image
                src={DEFAULT_MALE_CLIENT_LOGO_URL}
                alt="CLient Logo"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <div>{application.clientID}</div>
          </div>
        </Link>
      </TD>
      <TD>{application.templateName}</TD>
      <TD className="max-w-[100px] truncate">
        <span className="rounded-full bg-n-300 px-[6px] py-[2px] text-[10px] text-n-700">
          <span className="font-semibold">{application.role}</span> (
          {application.applicantFirstName} {application.applicantLastName})
        </span>
      </TD>
      <TD>
        <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
          {application.status}
        </span>
      </TD>
    </TR>
  )
}
