import Link from 'next/link'
import Image from 'next/image'

import { UserStatusTypes } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchClients } from '@/lib/data/user'
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

interface ClientsTableProps {
  orgName: string
  query: string
  currentPage: number
}

export default async function ClientsTable({ orgName, query, currentPage }: ClientsTableProps) {
  const totalRowsPerPage = 14
  const { clients, total } = await searchClients(
    orgName,
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
            <TableHead>{''}</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="w-max">
                    <Image
                      src={client.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-nowrap">
                  <Link href={`/admin/clients/${client.id}`}>
                    {client.firstName} {client.lastName}
                  </Link>
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.id}</TableCell>
                <TableCell>
                  <Badge
                    variant={client.status === UserStatusTypes.ACTIVE ? 'default' : 'secondary'}
                  >
                    {client.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="py-[12px] text-center text-n-500">
                No clients found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
