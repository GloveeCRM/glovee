import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { fetchOrganizationProfile } from '@/lib/data/organization'

interface OrgInfoCardProps {
  orgName: string
}

export default async function OrgInfoCard({ orgName }: OrgInfoCardProps) {
  const { organization } = await fetchOrganizationProfile({ orgName })

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return (
    <div
      id="org-info"
      className="border-sand-500 bg-coral-400 flex items-center gap-[8px] rounded-md p-[6px] text-[14px] font-semibold"
    >
      <Image
        src={organization?.logoURL || DEFAULT_ORG_LOGO_URL}
        alt="Organization Logo"
        width={65}
        height={65}
        className="rounded-full"
      />
      <h1>{organization?.name}</h1>
    </div>
  )
}
