export default function AuthOrganizationInfoSkeleton() {
  return (
    <div className="mb-[6px] flex animate-pulse flex-col items-center gap-[20px]">
      <AuthOrganizationInfoSkeletonImage />
      <AuthOrganizationInfoSkeletonText />
    </div>
  )
}

function AuthOrganizationInfoSkeletonImage() {
  const imageSize = 'h-[86px] w-[86px]'

  return (
    <div
      className={`flex flex-col items-center justify-center gap-[4px] rounded-xl bg-sand-700 ${imageSize}`}
    >
      <div className="h-[16px] w-[20px] rounded bg-sand-400" />
      <div className="h-[16px] w-[40px] rounded bg-sand-500" />
      <div className="h-[16px] w-[60px] rounded bg-sand-600" />
    </div>
  )
}

function AuthOrganizationInfoSkeletonText() {
  return <div className="h-[12px] w-1/2 rounded bg-sand-700" />
}
