export default function ApplicationUpdatesContainerSkeleton() {
  return (
    <div className="flex w-[300px] flex-col gap-[8px] overflow-y-auto border-l border-sand-500 bg-sand-400 p-[8px]">
      <ApplicationUpdateSkeleton />
      <ApplicationUpdateSkeleton />
      <ApplicationUpdateSkeleton />
      <ApplicationUpdateSkeleton />
      <ApplicationUpdateSkeleton />
    </div>
  )
}

function ApplicationUpdateSkeleton() {
  return (
    <div className="flex animate-pulse gap-[8px] rounded-md border border-sand-500 bg-white p-[8px] shadow-sm">
      <div className="h-[30px] w-[30px] flex-shrink-0 rounded-full bg-sand-500" />
      <div className="flex w-full flex-col gap-[23px]">
        <div className="mt-[4px] h-[12px] w-[140px] rounded bg-sand-600" />
        <div className="mb-[4px] flex justify-between">
          <div className="h-[8px] w-[80px] rounded bg-sand-500" />
          <div className="h-[8px] w-[50px] rounded bg-sand-500" />
        </div>
      </div>
    </div>
  )
}
