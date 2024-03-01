import Link from 'next/link'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

import TemplateCardOptionsMenuButton from './template-card-options-menu-button'

interface TemplateCardProps {
  title: string
  id: string
  description?: string
}

export default function TemplateCard({ id, title, description }: TemplateCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-n-600 p-[8px]">
      <div className="mb-[8px] flex justify-between gap-[10px]">
        <p className="text-[16px] font-bold text-n-700">{title}</p>
        <TemplateCardOptionsMenuButton templateId={id} />
      </div>
      <div>
        {description && (
          <p className="mb-[10px] line-clamp-3 text-[14px] text-n-600">{description}</p>
        )}
        <div className="flex gap-[8px]">
          <Link
            href={`/admin/template/${id}/preview`}
            className="flex h-[36px] w-full items-center justify-center rounded bg-n-600 text-n-100"
          >
            View
          </Link>
          <Link
            href={`/admin/template/${id}/edit`}
            className="flex h-[36px] w-1/5 items-center justify-center rounded bg-n-600 text-n-100"
          >
            <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
