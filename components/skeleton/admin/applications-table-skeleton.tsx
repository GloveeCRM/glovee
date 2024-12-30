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
        <div className="h-[10px] w-[100px] rounded bg-zinc-200" />
      </div>
      <div className="min-w-[172px] pl-[43px]">
        <div className="h-[10px] w-[60px] rounded bg-zinc-200" />
      </div>
      <div className="min-w-[90px]">
        <div className="h-[10px] w-[60px] rounded bg-zinc-200" />
      </div>
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex justify-between gap-[24px] px-[16px] py-[6px]">
      <div className="flex min-w-[120px] items-center">
        <div className="h-[10px] w-[120px] rounded bg-zinc-200" />
      </div>
      <div className="flex min-w-[172px] items-center">
        <div className="flex items-center gap-[12px]">
          <div className="h-[30px] w-[30px] rounded-full bg-zinc-200" />
          <div className="h-[10px] w-[130px] rounded bg-zinc-200" />
        </div>
      </div>
      <div className="flex min-w-[90px] items-center">
        <div className="h-[10px] w-[90px] rounded bg-zinc-200" />
      </div>
    </div>
  )
}

function TablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[20px] py-[16px]">
      <div className="flex gap-[8px] rounded bg-zinc-50 p-[10px]">
        <div className="h-[10px] w-[10px] rounded bg-zinc-100" />
        <div className="h-[10px] w-[90px] rounded bg-zinc-100" />
      </div>
      <div className="flex gap-[8px]">
        <div className="h-[30px] w-[30px] rounded bg-zinc-300" />
        <div className="h-[30px] w-[30px] rounded bg-zinc-200" />
        <div className="h-[30px] w-[30px] rounded bg-zinc-200" />
      </div>
      <div className="flex gap-[8px] rounded bg-zinc-50 p-[10px]">
        <div className="h-[10px] w-[60px] rounded bg-zinc-200" />
        <div className="h-[10px] w-[10px] rounded bg-zinc-200" />
      </div>
    </div>
  )
}
