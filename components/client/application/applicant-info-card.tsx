import { DEFAULT_MALE_CLIENT_LOGO_URL } from '@/lib/constants/images'
import { fetchApplicantByApplicationId } from '@/lib/data/application'
import Image from 'next/image'

interface ApplicantInfoCardProps {
  applicationId: string
}

const applicant = {
  applicantFirstName: 'Hannah',
  applicantLastName: 'Habibpour',
  email: 'hana.habibpor@gmail.com',
  imgUrl: null,
}

export default async function ApplicantInfoCard({ applicationId }: ApplicantInfoCardProps) {
  //   const applicant = await fetchApplicantByApplicationId(applicationId)
  return (
    <div className="flex items-center gap-[6px] rounded-md bg-n-600 p-[6px]">
      <Image
        src={applicant.imgUrl || DEFAULT_MALE_CLIENT_LOGO_URL}
        alt="Organization Logo"
        width={55}
        height={55}
        className="rounded-full"
      />
      <div>
        <div className="text-[12px] font-semibold text-n-100">{`${applicant.applicantFirstName} ${applicant.applicantLastName}`}</div>
        <div className="text-[9px] text-n-300">{applicant.email}</div>
      </div>
    </div>
  )
}
