import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

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
    <tr key={id} className="hover:bg-gray-100">
      <td>{id}</td>
      <td className="flex items-end gap-[6px]">
        {
          <Image
            src={DEFAULT_MALE_CLIENT_LOGO_URL}
            alt="CLient Logo"
            width={25}
            height={25}
            className="rounded-full"
          />
        }
        {clientName}
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
