import Link from 'next/link'

export default function ClientTableRow({
  id,
  name,
  email,
  status,
}: {
  id: string
  name: string
  email: string
  status: string
}) {
  return (
    <tr key={id}>
      <td>
        <Link className="cursor-pointer text-sky-500 underline" href={`/admin/clients/${id}`}>
          {id}
        </Link>
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{status}</td>
    </tr>
  )
}
