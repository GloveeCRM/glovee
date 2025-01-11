export default function ClientApplicationsTableSkeleton() {
  return (
    <div className="flex h-fit animate-pulse flex-col overflow-auto rounded-md border border-sand-500 bg-white px-[12px]">
      <table className="w-full border-collapse text-[14px]">
        <TableHeaderSkeleton />
        <TableBodySkeleton />
      </table>
    </div>
  )
}

function TableHeaderSkeleton() {
  return (
    <thead className="sticky top-0 bg-white">
      <tr className="text-left text-[14px]">
        <th className="w-[25%] min-w-[120px] py-[16px]">
          <div className="h-[10px] w-[100px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[240px] py-[16px]">
          <div className="h-[10px] w-[120px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[140px] py-[16px]">
          <div className="h-[10px] w-[90px] rounded bg-sand-600" />
        </th>
        <th className="w-[25%] min-w-[140px] py-[16px]">
          <div className="h-[10px] w-[90px] rounded bg-sand-600" />
        </th>
      </tr>
    </thead>
  )
}

function TableBodySkeleton() {
  return (
    <tbody>
      {[1, 2, 3].map((_, index) => (
        <TableRowSkeleton key={index} isLast={index === 2} />
      ))}
    </tbody>
  )
}

function TableRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <tr className={`text-left ${!isLast && 'border-b'}`}>
      <td className="py-[16px]">
        <div className="h-[10px] w-[80px] rounded bg-sand-500" />
      </td>
      <td className="py-[16px]">
        <div className="h-[10px] w-[180px] rounded bg-sand-500" />
      </td>
      <td className="py-[16px]">
        <div className="h-[10px] w-[120px] rounded bg-sand-500" />
      </td>
      <td className="py-[16px]">
        <div className="h-[10px] w-[120px] rounded bg-sand-500" />
      </td>
    </tr>
  )
}
