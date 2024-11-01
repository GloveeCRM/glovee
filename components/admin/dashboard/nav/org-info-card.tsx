import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { fetchOrganizationProfile } from '@/lib/data/organization'

interface OrgInfoCardProps {
  orgName: string
}

export default async function OrgInfoCard({ orgName }: OrgInfoCardProps) {
  const { organization } = await fetchOrganizationProfile({ orgName })

  return (
    <div
      id="org-info"
      className="flex items-center gap-[8px] rounded-md bg-n-600 p-[6px] text-[14px] font-semibold text-n-100"
    >
      <Image
        src={organization?.logoURL || DEFAULT_ORG_LOGO_URL}
        alt="Organization Logo"
        width={65}
        height={65}
        className="rounded-full"
      />
      <h1>{organization?.name || 'Untitled Organization'}</h1>
    </div>
  )
}
