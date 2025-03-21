import Image from 'next/image'

import { DEFAULT_ORG_LOGO_URL } from '@/lib/constants/images'
import { fetchOrganizationProfile } from '@/lib/data/organization'

interface AuthOrganizationInfoProps {
  orgName: string
}

export default async function AuthOrganizationInfo({ orgName }: AuthOrganizationInfoProps) {
  const { organization } = await fetchOrganizationProfile({ orgName })

  const logoUrl = organization?.logoFile?.url || DEFAULT_ORG_LOGO_URL
  const organizationName = organization?.name || 'Something went wrong'

  return (
    <div className="flex flex-col items-center">
      <Image
        src={logoUrl}
        alt=""
        width={64}
        height={64}
        className="h-[86px] w-[86px] rounded-xl border border-sand-500 shadow-sm"
      />
      <h2 className="mt-[10px] text-center text-xl font-bold">{organizationName}</h2>
    </div>
  )
}
