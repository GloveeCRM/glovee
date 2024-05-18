import Image from 'next/image'
import Link from 'next/link'

import { UserType } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchClients } from '@/lib/data/user'
import { TBody, TD, TH, THead, TR, Table } from '@/components/ui/table'

interface ClientsTableProps {
  orgName: string
  query: string
}

export default async function ClientsTable({ orgName, query }: ClientsTableProps) {
  const clients = await searchClients(orgName, query, 10, 0)

  return (
    <Table className="mt-[20px]">
      <THead>
        <TR>
          <TH>{''}</TH>
          <TH>Name</TH>
          <TH>Email</TH>
          <TH>ID</TH>
          <TH>Status</TH>
        </TR>
      </THead>
      <TBody>
        {clients.length === 0 ? (
          <TR>
            <TD colSpan={5} className="py-[12px] text-center text-n-500">
              No clients found
            </TD>
          </TR>
        ) : (
          clients.map((client) => <ClientsTableRow client={client} key={client.id} />)
        )}
      </TBody>
    </Table>
  )
}

interface ClientsTableRowProps {
  client: UserType
}

function ClientsTableRow({ client }: ClientsTableRowProps) {
  return (
    <TR className="hover:bg-n-100">
      <TD>
        <Image
          src={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
          alt="CLient Logo"
          width={45}
          height={45}
          className="min-w-[45px] rounded-full"
        />
      </TD>
      <TD className="whitespace-nowrap">
        <Link
          className="cursor-pointer pr-[16px] font-medium hover:text-blue-600"
          href={`/admin/clients/${client.id}`}
        >
          {client.firstName} {client.lastName}
        </Link>
      </TD>
      <TD className="pr-[16px]">{client.email}</TD>
      <TD className="pr-[16px]">{client.id}</TD>
      <TD>
        <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
          {client.status}
        </span>
      </TD>
    </TR>
  )
}
