import React from 'react'

// interface TableProps {
//   classname?: string
//   theaders?: string[]
//   items?: any[]
//   tableName?: string
//   children?: React.ReactNode
//   text?: 'sm' | 'md' | 'lg'
// }

// export function Table({
//   classname,
//   theaders,
//   items,
//   tableName,
//   text = 'sm',
//   children,
// }: TableProps) {
//   const textSize =
//     text === 'sm'
//       ? 'text-[14px]'
//       : text === 'md'
//         ? 'text-[16px]'
//         : text === 'lg'
//           ? 'text-[18px]'
//           : 'text-[14px]'
//   return (
//     <table className={`${classname} ${textSize} mt-[28px] w-full`}>
//       <THead>
//         <TR>{theaders?.map((header) => <TH key={header}>{header}</TH>)}</TR>
//       </THead>
//       <TBody>
//         {items?.length === 0 ? (
//           <TR>
//             <td
//               colSpan={theaders?.length}
//               className="py-[12px] text-center text-n-500"
//             >{`No ${tableName} found`}</td>
//           </TR>
//         ) : (
//           <>{children}</>
//         )}
//       </TBody>
//     </table>
//   )
// }

interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return <table className={`${className} w-full`}>{children}</table>
}

interface TBodyProps {
  children: React.ReactNode
}

export function TBody({ children }: TBodyProps) {
  return <tbody>{children}</tbody>
}

interface THeadProps {
  children: React.ReactNode
}

export function THead({ children }: THeadProps) {
  return <thead className="border-b-2 border-n-700 text-left">{children}</thead>
}

interface THProps {
  children: React.ReactNode
}

export function TH({ children }: THProps) {
  return <th className={``}>{children}</th>
}

interface TRProps {
  children: React.ReactNode
  className?: string
}

export function TR({ children, className }: TRProps) {
  return <tr className={`${className}`}>{children}</tr>
}

interface TDProps {
  children: React.ReactNode
  className?: string
  colSpan?: number
}

export function TD({ children, className, colSpan }: TDProps) {
  return (
    <td className={`${className} py-[2px]`} colSpan={colSpan}>
      {children}
    </td>
  )
}
