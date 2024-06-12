import Image from 'next/image'

import { getSessionPayload } from '@/lib/auth/session'
import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchApplicantInformation } from '@/lib/data/application'

interface ApplicantInfoCardProps {
  orgName: string
  applicationID: number
}

export default async function ApplicantInfoCard({
  orgName,
  applicationID,
}: ApplicantInfoCardProps) {
  const payload = await getSessionPayload()
  const userID = payload?.user.id || 0
  const applicant = await fetchApplicantInformation(orgName, userID, applicationID)

  return (
    <div className="flex items-center gap-[6px] rounded-md bg-n-600 p-[6px]">
      <Image
        src={applicant?.imageURL || DEFAULT_MALE_CLIENT_LOGO_URL}
        alt="Organization Logo"
        width={55}
        height={55}
        className="rounded-full"
      />
      <div>
        <div className="text-[12px] font-semibold text-n-100">{`${applicant.firstName} ${applicant.lastName}`}</div>
        <div className="text-[9px] text-n-300">{applicant.email}</div>
      </div>
    </div>
  )
}
