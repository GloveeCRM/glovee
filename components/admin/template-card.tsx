import Link from 'next/link'
import { FiMoreHorizontal } from 'react-icons/fi'

export default function TemplateCard({
  title,
  description,
  id,
}: Readonly<{
  title: string
  description: string
  id: number
}>) {
  return (
    <div key={id} className="border-n-600 flex flex-col justify-between rounded-md border p-[8px]">
      <div className="mb-[8px] flex justify-between gap-[10px]">
        <p className="text-n-700 text-[16px] font-bold">{title}</p>
        <span>
          <FiMoreHorizontal className="h-[22px] w-[22px]" />
        </span>
      </div>
      <div>
        <p className="text-n-600 mb-[10px] line-clamp-3 text-[14px]">{description}</p>
        <Link href={`/admin/templates/${id}`}>
          <button className="bg-n-600 text-n-100 h-[36px] w-full rounded">View</button>
        </Link>
      </div>
    </div>
  )
}
