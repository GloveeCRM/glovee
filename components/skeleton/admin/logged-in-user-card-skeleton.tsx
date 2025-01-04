interface LoggedInUserCardSkeletonProps {
  collapsed?: boolean
}

export default function LoggedInUserCardSkeleton({ collapsed }: LoggedInUserCardSkeletonProps) {
  return (
    <div className="flex animate-pulse items-center gap-[8px]">
      <div className="h-[40px] w-[40px] rounded-full bg-sand-600" />
      {!collapsed && <div className="h-[10px] w-2/3 rounded bg-sand-600" />}
      <div className="h-[10px] w-[10px] rounded bg-sand-600" />
    </div>
  )
}
