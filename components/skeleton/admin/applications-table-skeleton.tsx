export default function ApplicationsTableSkeleton() {
  return (
    <div className="border-sand-500 flex h-fit animate-pulse flex-col gap-[6px] rounded-md border bg-white">
      <TableHeaderSkeleton />
      <div className="flex flex-col gap-[8px]">
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </div>
      <TablePaginationSkeleton />
    </div>
  )
}

function TableHeaderSkeleton() {
  return (
    <div className="flex justify-between gap-[24px] px-[16px] py-[16px]">
      <div className="min-w-[120px]">
        <div className="bg-sand-600 h-[10px] w-[100px] rounded" />
      </div>
      <div className="min-w-[172px] pl-[43px]">
        <div className="bg-sand-600 h-[10px] w-[60px] rounded" />
      </div>
      <div className="min-w-[90px]">
        <div className="bg-sand-600 h-[10px] w-[60px] rounded" />
      </div>
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex justify-between gap-[24px] px-[16px] py-[6px]">
      <div className="flex min-w-[120px] items-center">
        <div className="bg-sand-500 h-[10px] w-[120px] rounded" />
      </div>
      <div className="flex min-w-[172px] items-center">
        <div className="flex items-center gap-[12px]">
          <div className="bg-sand-600 h-[30px] w-[30px] rounded-full" />
          <div className="bg-sand-600 h-[10px] w-[130px] rounded" />
        </div>
      </div>
      <div className="flex min-w-[90px] items-center">
        <div className="bg-sand-500 h-[10px] w-[90px] rounded" />
      </div>
    </div>
  )
}

function TablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[20px] py-[16px]">
      <div className="bg-sand-200 flex gap-[8px] rounded p-[10px]">
        <div className="bg-sand-500 h-[10px] w-[10px] rounded" />
        <div className="bg-sand-500 h-[10px] w-[90px] rounded" />
      </div>
      <div className="flex gap-[8px]">
        <div className="bg-sand-600 h-[30px] w-[30px] rounded" />
        <div className="bg-sand-500 h-[30px] w-[30px] rounded" />
        <div className="bg-sand-500 h-[30px] w-[30px] rounded" />
      </div>
      <div className="bg-sand-400 flex gap-[8px] rounded p-[10px]">
        <div className="bg-sand-700 h-[10px] w-[60px] rounded" />
        <div className="bg-sand-700 h-[10px] w-[10px] rounded" />
      </div>
    </div>
  )
}
