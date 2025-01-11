export default function AdminApplicationInfoTopbarSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center justify-between gap-[8px]">
      <span className="text-[14px]">
        <div className="h-[10px] w-[180px] rounded bg-sand-600" />
      </span>
      <div className="flex items-center gap-[12px]">
        <div className="h-[10px] w-[130px] rounded bg-sand-600" />
        <div className="h-[30px] w-[30px] rounded-full bg-sand-600" />
      </div>
    </div>
  )
}
