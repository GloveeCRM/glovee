import Link from 'next/link'

import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { Button } from '@/components/ui/button'
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
          <Button asChild size="md" fullWidth>
            <Link href={`/admin/template/${id}/preview`}>View</Link>
          </Button>
          <Button asChild size="md">
            <Link href={`/admin/template/${id}/edit`}>
              <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
