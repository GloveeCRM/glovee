export default function ApplicationsTableSkeleton() {
  return (
    <div className="flex h-fit animate-pulse flex-col overflow-auto rounded-md border border-sand-500 bg-white px-[12px] py-[8px]">
      <table className="w-full border-collapse text-[14px]">
        <TableHeaderSkeleton />
        <TableBodySkeleton />
      </table>
      <TablePaginationSkeleton />
    </div>
  )
}

function TableHeaderSkeleton() {
  return (
    <thead className="sticky top-0 bg-white">
      <tr className="text-left text-[14px]">
        <th className="w-[25%] min-w-[120px] py-[12px]">
          <div className="h-[10px] w-[100px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[208px] py-[12px] pl-[43px]">
          <div className="h-[10px] w-[60px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[240px] py-[12px]">
          <div className="h-[10px] w-[100px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[140px] py-[12px]">
          <div className="h-[10px] w-[60px] rounded bg-sand-600" />
        </th>
      </tr>
    </thead>
  )
}

function TableBodySkeleton() {
  return (
    <tbody>
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <TableRowSkeleton key={index} isLast={index === 5} />
      ))}
    </tbody>
  )
}

function TableRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <tr className={`text-left ${!isLast && 'border-b'}`}>
      <td className="py-[8px]">
        <div className="h-[10px] w-[120px] rounded bg-sand-500" />
      </td>
      <td className="py-[8px]">
        <div className="flex items-center gap-[12px]">
          <div className="h-[30px] w-[30px] rounded-full bg-sand-600" />
          <div className="h-[10px] w-[130px] rounded bg-sand-600" />
        </div>
      </td>
      <td className="py-[8px]">
        <div className="h-[10px] w-[240px] rounded bg-sand-600" />
      </td>
      <td className="py-[8px]">
        <div className="h-[10px] w-[90px] rounded bg-sand-500" />
      </td>
    </tr>
  )
}

function TablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[20px] py-[16px]">
      <div className="flex gap-[8px] rounded bg-sand-200 p-[10px]">
        <div className="h-[10px] w-[10px] rounded bg-sand-500" />
        <div className="h-[10px] w-[90px] rounded bg-sand-500" />
      </div>
      <div className="flex gap-[8px]">
        <div className="h-[30px] w-[30px] rounded bg-sand-600" />
        <div className="h-[30px] w-[30px] rounded bg-sand-500" />
        <div className="h-[30px] w-[30px] rounded bg-sand-500" />
      </div>
      <div className="flex gap-[8px] rounded bg-sand-400 p-[10px]">
        <div className="h-[10px] w-[60px] rounded bg-sand-700" />
        <div className="h-[10px] w-[10px] rounded bg-sand-700" />
      </div>
    </div>
  )
}
