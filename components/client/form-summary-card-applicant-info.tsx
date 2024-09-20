import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

interface FormSummaryCardApplicantInfoProps {
  applicantFirstName: string
  applicantLastName: string
  role: string
  imageUrl?: string
}

export default function FormSummaryCardApplicantInfo({
  applicantFirstName,
  applicantLastName,
  role,
  imageUrl,
}: FormSummaryCardApplicantInfoProps) {
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
  return (
    <div className="flex items-center gap-[6px]">
      <Image
        src={imageUrl ? imageUrl : DEFAULT_MALE_CLIENT_LOGO_URL}
        alt="CLient Logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <div className="text-[14px]">{`${applicantFirstName} ${applicantLastName}`}</div>
        <span className="text-[12px]">{formattedRole}</span>
      </div>
    </div>
  )
}
