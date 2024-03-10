import Link from 'next/link'
import Image from 'next/image'

import { UserStatus } from '@prisma/client'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import ActiveButton from './active-button'
import DeactiveButton from './deactive-button'

export default function ClientsTableRow({
  id,
  image,
  name,
  email,
  status,
}: {
  id: string
  image: string
  name: string
  email: string
  status: string
}) {
  return (
    <tr key={id}>
      <td className="min-w-[50px]">
        <Image
          src={image || DEFAULT_MALE_CLIENT_LOGO_URL}
          alt="CLient Logo"
          width={45}
          height={45}
          className="rounded-full"
        />
      </td>
      <td>
        <Link className="cursor-pointer text-sky-500 underline" href={`/admin/clients/${id}`}>
          {name}
        </Link>
      </td>
      <td>{email}</td>
      <td>{id}</td>
      <td className="">
        <span className="rounded-full bg-n-600 p-[6px] text-center text-xs text-white">
          {status}
        </span>
        {/* {(status === UserStatus.ACTIVE && <DeactiveButton CLientId={id} />) ||
          (status === UserStatus.INACTIVE && <ActiveButton CLientId={id} />)} */}
      </td>
    </tr>
  )
}
