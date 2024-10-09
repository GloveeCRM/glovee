import Link from 'next/link'
import Image from 'next/image'

import { UserRoleTypes, UserStatusTypes } from '@/lib/types/user'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { searchUsers } from '@/lib/data/user'
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
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { users, total } = await searchUsers({
    filters: { role: UserRoleTypes.ORG_CLIENT },
    query,
    limit: totalRowsPerPage,
    offset,
  })
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
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="w-max">
                    <Image
                      src={user.avatarURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-nowrap">
                  <Link href={`/admin/clients/${user.id}`} className="hover:text-blue-500">
                    {user.firstName} {user.lastName}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Badge variant={user.status === UserStatusTypes.ACTIVE ? 'default' : 'secondary'}>
                    {user.status}
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
      {users && users.length < total && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
