'use client'

import Link from 'next/link'
import { FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import Popover, { PopoverContent, PopoverTrigger } from '../ui/popover'

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
        <div>
          <Popover>
            <PopoverTrigger>
              <button>
                <FiMoreHorizontal className="h-[22px] w-[22px] cursor-pointer" />
              </button>
            </PopoverTrigger>
            <PopoverContent className={'bg-n-300 rounded-sm'}>
              <div>
                <ul>
                  <li className="text-red-500">Delete</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <p className="text-n-600 mb-[10px] line-clamp-3 text-[14px]">{description}</p>
        <div className="flex gap-[8px]">
          <Link
            href={`/admin/templates/${id}/preview`}
            className="bg-n-600 text-n-100 flex h-[36px] w-full items-center justify-center rounded"
          >
            View
          </Link>
          <Link
            href={`/admin/templates/${id}/edit`}
            className="bg-n-600 text-n-100 flex h-[36px] w-1/5 items-center justify-center rounded"
          >
            <HiOutlinePencilSquare className="h-[20px] w-[20px]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
