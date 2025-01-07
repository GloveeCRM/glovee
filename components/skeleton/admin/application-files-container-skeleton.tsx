export default function ApplicationFilesContainerSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-[38px] overflow-y-auto">
      <ApplicationFileDaySkeleton countFiles={1} />
      <ApplicationFileDaySkeleton countFiles={3} />
    </div>
  )
}

interface ApplicationFileDaySkeletonProps {
  countFiles: number
}

function ApplicationFileDaySkeleton({ countFiles }: ApplicationFileDaySkeletonProps) {
  return (
    <div className="flex flex-col gap-[22px]">
      <div className="h-[18px] w-[130px] rounded-lg bg-sand-500" />
      <div className="flex flex-col gap-[12px] px-[8px]">
        {Array.from({ length: countFiles }).map((_, index) => (
          <ApplicationFileSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

function ApplicationFileSkeleton() {
  return (
    <div className="flex min-w-[400px] justify-between gap-[12px] rounded-lg border border-sand-500 bg-white p-[10px] shadow-sm">
      <div className="flex items-center gap-[12px]">
        <div className="bg-sand-450 h-[39px] w-[39px] rounded" />
        <div className="flex flex-col gap-[8px]">
          <div className="h-[12px] w-[140px] rounded-full bg-sand-600" />
          <div className="h-[10px] w-[60px] rounded-full bg-sand-500" />
        </div>
      </div>
      <div className="h-[40px] w-[40px] rounded-full bg-sand-400" />
    </div>
  )
}
