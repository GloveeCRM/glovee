interface OrgInfoCardSkeletonProps {
  collapsed?: boolean
}

export default function OrgInfoCardSkeleton({ collapsed }: OrgInfoCardSkeletonProps) {
  const imageSize = collapsed ? 'h-[51px] w-[51px]' : 'h-[65px] w-[65px]'

  return (
    <div className="flex animate-pulse items-center gap-[8px] rounded-md bg-coral-400 p-[6px]">
      <div className={`rounded-full bg-coral-100 ${imageSize}`} />
      {!collapsed && <div className="h-[12px] w-1/2 rounded bg-coral-100" />}
    </div>
  )
}
