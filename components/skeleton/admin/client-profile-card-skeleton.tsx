export default function ClientProfileCardSkeleton() {
  return (
    <div className="bg-sand-600 flex animate-pulse items-center gap-[8px] rounded-md p-[14px]">
      <div className="bg-sand-400 h-[100px] w-[100px] rounded-full" />
      <div className="flex flex-col gap-[18px]">
        <div className="flex gap-[8px]">
          <div className="bg-sand-400 h-[18px] w-[140px] rounded" />
          <div className="bg-sand-400 h-[18px] w-[65px] rounded-full" />
        </div>
        <div className="bg-sand-500 h-[15px] w-[240px] rounded" />
        <div className="bg-sand-500 h-[14px] w-[120px] rounded-full" />
      </div>
    </div>
  )
}
