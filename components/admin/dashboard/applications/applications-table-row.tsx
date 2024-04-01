import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import Link from 'next/link'

interface ApplicationsTableRowProps {
  id: string
  clientName: string
  templateName: string
  role: string
  status: string
  applicantFirstName: string
  applicantLastName: string
}

export default function ApplicationsTableRow({
  id,
  clientName,
  templateName,
  role,
  status,
  applicantFirstName,
  applicantLastName,
}: ApplicationsTableRowProps) {
  return (
    <tr key={id} className=" hover:bg-n-200">
      <td className="py-[10px]">
        <Link
          className="cursor-pointer font-medium hover:text-blue-600"
          href={`/admin/applications/${id}`}
        >
          {id}
        </Link>
      </td>
      <td>
        <Link
          className="cursor-pointer font-medium hover:text-blue-600"
          href={`/admin/clients/${id}`}
        >
          <div className="flex items-end gap-[6px]">
            <Image
              src={DEFAULT_MALE_CLIENT_LOGO_URL}
              alt="CLient Logo"
              width={25}
              height={25}
              className="rounded-full"
            />
            {clientName}
          </div>
        </Link>
      </td>
      <td>{templateName}</td>
      <td>
        <span className="rounded-full bg-n-200 px-[6px] py-[2px] text-[12px] text-n-700">
          {` ${role} (${applicantFirstName} ${applicantLastName})`}
        </span>
      </td>
      <td>
        <span className="rounded-full bg-n-600 px-[6px] py-[2px] text-[12px] text-white">
          {status}
        </span>
      </td>
    </tr>
  )
}
