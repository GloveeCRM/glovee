import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { UserStatusTypes } from '@/lib/types/user'
import { searchClients } from '@/lib/data/user'

import { Pagination } from '@/components/ui/pagination'

interface ClientsTableProps {
  query: string
  currentPage: number
}

export default async function ClientsTable({ query, currentPage }: ClientsTableProps) {
  const totalRowsPerPage = 14
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { clients, totalCount } = await searchClients({
    filters: {},
    searchQuery: query,
    limit: totalRowsPerPage,
    offset,
  })

  const totalPages = Math.ceil(totalCount / totalRowsPerPage)

  return (
    <div className="border-sand-500 flex h-fit flex-col overflow-auto rounded-md border bg-white px-[12px]">
      <table className="w-full border-collapse text-[14px]">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-[14px]">
            <th className="min-w-[208px] py-[12px] pl-[57px] font-medium">Client</th>
            <th className="min-w-[100px] py-[12px] font-medium">ID</th>
            <th className="min-w-[71px] py-[12px] font-medium">Status</th>
            <th className="min-w-[140px] py-[12px] font-medium">Date added</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.userID} className="hover:bg-sand-200 border-b text-left">
                <td className="py-[6px]">
                  <div className="flex items-center gap-[12px]">
                    <Image
                      src={client.profilePictureURL || DEFAULT_MALE_CLIENT_LOGO_URL}
                      alt=""
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                    <div className="flex min-w-0 flex-col">
                      <Link href={`/admin/clients/${client.userID}`}>
                        <div className="text-[14px] font-semibold">
                          {client.firstName} {client.lastName}
                        </div>
                      </Link>
                      <div className="truncate text-[12px] text-n-500">{client.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-[6px] text-zinc-600">{client.userID}</td>
                <td className="py-[6px] text-[12px] font-medium">
                  <div
                    className={`w-fit rounded-full px-[12px] py-[2px] ${
                      client.status === UserStatusTypes.ACTIVE ? 'bg-teal-100' : 'bg-coral-200'
                    }`}
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1).toLowerCase()}
                  </div>
                </td>
                <td className="py-[6px] text-zinc-600">
                  {client.createdAt
                    ? new Date(client.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-[24px] text-center text-zinc-600">
                No clients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {clients && clients.length < totalCount && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}
