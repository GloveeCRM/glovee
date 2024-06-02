import Link from 'next/link'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

import TemplateCardOptionsMenuButton from './template-card-options-menu-button'

interface TemplateCardProps {
  orgName: string
  id: number
  title: string
  description?: string
}

export default function TemplateCard({ orgName, id, title, description }: TemplateCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-n-500 p-[8px]">
      <div className="mb-[8px] flex justify-between gap-[10px]">
        <p className="text-[16px] font-bold">{title}</p>
        <TemplateCardOptionsMenuButton orgName={orgName} templateID={id} />
      </div>
      <div>
        {description && <p className="mb-[10px] line-clamp-3 text-[14px]">{description}</p>}
        <div className="flex gap-[8px]">
          <Link
            href={`/admin/template/${id}/preview`}
            className="flex h-[36px] w-full items-center justify-center rounded bg-n-600 text-n-100"
          >
            View
          </Link>
          {/* TODO: Temporarily disabled the ability to edit a template. Reactivate or remove. */}
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
