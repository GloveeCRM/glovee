'use client'

import Link from 'next/link'

import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlinePencilSquare } from 'react-icons/hi2'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { deleteTemplateById } from '@/lib/actions/template'

export default function TemplateCard({
  title,
  description,
  id,
}: Readonly<{
  title: string
  description: string | null
  id: string
}>) {
  return (
    <div key={id} className="flex flex-col justify-between rounded-md border border-n-600 p-[8px]">
      <div className="mb-[8px] flex justify-between gap-[10px]">
        <p className="text-[16px] font-bold text-n-700">{title}</p>
        <Popover>
          <PopoverTrigger
            className="rounded-[3px] transition duration-100"
            openClassName="bg-n-700 text-n-100"
          >
            <FiMoreHorizontal className="h-[22px] w-[22px]" />
          </PopoverTrigger>
          <PopoverContent
            position="bottom-left"
            className="mt-[3px] rounded-[3px] bg-n-700 p-[4px]
             text-[14px] text-n-100 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
          >
            <ul>
              <li
                onClick={() => {
                  deleteTemplateById(id)
                }}
                className="flex cursor-pointer items-center gap-[4px] rounded-sm p-[6px] font-medium text-red-500 transition duration-100 hover:bg-n-600"
              >
                <span>
                  <BiTrash className="h-[18px] w-[18px]" />
                </span>
                <span>Delete Template</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <p className="mb-[10px] line-clamp-3 text-[14px] text-n-600">{description}</p>
        <div className="flex gap-[8px]">
          <Link
            href={`/admin/templates/${id}/preview`}
            className="flex h-[36px] w-full items-center justify-center rounded bg-n-600 text-n-100"
          >
            View
          </Link>
          <Link
            href={`/admin/templates/${id}/edit`}
            className="flex h-[36px] w-1/5 items-center justify-center rounded bg-n-600 text-n-100"
          >
            <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
