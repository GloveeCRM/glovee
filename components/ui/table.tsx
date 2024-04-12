import React from 'react'

interface TableProps {
  classname?: string
  theaders?: string[]
  items?: any[]
  tableName?: string
  children?: React.ReactNode
  text?: 'sm' | 'md' | 'lg'
}

export default function Table({
  classname,
  theaders,
  items,
  tableName,
  children,
  text = 'sm',
}: TableProps) {
  const textSize =
    text === 'sm'
      ? 'text-[14px]'
      : text === 'md'
        ? 'text-[16px]'
        : text === 'lg'
          ? 'text-[18px]'
          : 'text-[14px]'
  return (
    <table className={`${classname} ${textSize} mt-[28px] w-full`}>
      <tbody>
        <tr className="border-b-2 border-n-700 text-left">
          {theaders?.length === 0 ? (
            <th>No header</th>
          ) : (
            theaders?.map((header) => <th key={header}>{header}</th>)
          )}
        </tr>
        {items?.length === 0 ? (
          <tr>
            <td
              colSpan={theaders?.length}
              className="py-[12px] text-center text-n-500"
            >{`No ${tableName} found`}</td>
          </tr>
        ) : (
          <>{children}</>
        )}
      </tbody>
    </table>
  )
}
