import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import Link from 'next/link'
import Image from 'next/image'

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
      <td>
        <Image
          src={image || DEFAULT_MALE_CLIENT_LOGO_URL}
          alt="CLient Logo"
          width={65}
          height={65}
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
      <td>{status}</td>
    </tr>
  )
}
