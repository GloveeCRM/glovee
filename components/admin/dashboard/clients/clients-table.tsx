import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { UserStatusTypes } from '@/lib/types/user'
import { searchClients } from '@/lib/data/user'
import { formatDateToShortMonthDayYearTime } from '@/lib/utils/date'

import { Pagination } from '@/components/ui/pagination'

interface ClientsTableProps {
  searchQuery: string
  currentPage: number
}

export default async function ClientsTable({ searchQuery, currentPage = 1 }: ClientsTableProps) {
  const totalRowsPerPage = 14
  const offset = currentPage * totalRowsPerPage - totalRowsPerPage
  const { clients, totalCount } = await searchClients({
    filters: {},
    searchQuery,
    limit: totalRowsPerPage,
    offset,
  })

  const totalPages = Math.ceil(totalCount / totalRowsPerPage)

  return (
    <div className="flex h-fit flex-col overflow-auto rounded-md border border-sand-500 bg-white px-[12px]">
      <table className="w-full border-collapse text-[14px]">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-[14px]">
            <th className="min-w-[208px] py-[12px] pl-[53px] font-medium">Client</th>
            <th className="min-w-[100px] py-[12px] font-medium">ID</th>
            <th className="min-w-[71px] py-[12px] font-medium">Status</th>
            <th className="min-w-[140px] py-[12px] font-medium">Date added</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client, index) => (
              <tr
                key={client.userID}
                className={`text-left hover:bg-sand-200 ${clients.length !== index + 1 && 'border-b'}`}
              >
                <td className="py-[6px]">
                  <div className="flex items-center gap-[12px]">
                    <Image
                      src={client.profilePictureFile?.url || DEFAULT_MALE_CLIENT_LOGO_URL}
                      alt=""
                      width={40}
                      height={40}
                      className="h-[40px] w-[40px] rounded-full"
                      draggable={false}
                    />
                    <div className="flex min-w-0 flex-col">
                      <Link
                        href={`/admin/clients/${client.userID}`}
                        className="truncate text-[14px] font-semibold hover:underline"
                        draggable={false}
                      >
                        {client.firstName} {client.lastName}
                      </Link>
                      <div className="truncate text-[12px] text-zinc-500">{client.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-[6px] text-zinc-600">{client.userID}</td>
                <td className="py-[6px] text-[12px] font-medium">
                  <div
                    className={`w-fit rounded-full px-[12px] py-[1px] ${
                      client.status === UserStatusTypes.ACTIVE
                        ? 'bg-teal-100 text-teal-900'
                        : 'bg-coral-100 text-coral-900'
                    }`}
                  >
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1).toLowerCase()}
                  </div>
                </td>
                <td className="py-[6px] text-zinc-600">
                  {client.createdAt &&
                    formatDateToShortMonthDayYearTime({
                      date: client.createdAt,
                      format: 'long',
                      includeTime: false,
                    })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-[24px] text-center text-zinc-600">
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
