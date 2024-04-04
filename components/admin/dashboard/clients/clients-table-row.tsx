import Link from 'next/link'
import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

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
    <tr key={id} className="hover:bg-n-100">
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
        <Link
          className="cursor-pointer font-medium hover:text-blue-600"
          href={`/admin/clients/${id}`}
        >
          {name}
        </Link>
      </td>
      <td>{email}</td>
      <td>{id}</td>
      <td>
        <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
          {status}
        </span>
      </td>
    </tr>
  )
}
