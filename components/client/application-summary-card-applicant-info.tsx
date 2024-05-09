import Image from 'next/image'

import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'

interface ApplicationSummaryCardApplicantInfoProps {
  applicantFirstName: string
  applicantLastName: string
  role: string
  imageUrl?: string
}

export default function ApplicationSummaryCardApplicantInfo({
  applicantFirstName,
  applicantLastName,
  role,
  imageUrl,
}: ApplicationSummaryCardApplicantInfoProps) {
  return (
    <div className="flex items-center gap-[6px]">
      <Image
        src={imageUrl ? imageUrl : DEFAULT_MALE_CLIENT_LOGO_URL}
        alt="CLient Logo"
        width={45}
        height={45}
        className="rounded-full"
      />
      <div>
        <div className="text-[14px]">{`${applicantFirstName} ${applicantLastName}`}</div>
        <span className="text-[12px]">{role}</span>
      </div>
    </div>
  )
}
