'use client'

import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

import { deleteTemplateById } from '@/lib/actions/template'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'

export default function TemplateCardOptionsMenuButton({ templateId }: { templateId: string }) {
  return (
    <Popover>
      <PopoverTrigger
        className="rounded-[3px] transition duration-100"
        openClassName="bg-n-100 text-n-700"
      >
        <FiMoreHorizontal className="h-[22px] w-[22px]" />
      </PopoverTrigger>
      <PopoverContent
        position="bottom-left"
        className="mt-[2px] rounded-[3px] bg-n-100 p-[2px]
               text-[14px] text-n-700 shadow-[0px_0px_0px_1px_rgba(15,15,15,0.05),0px_3px_6px_rgba(15,15,15,0.2),0px_9px_24px_rgba(15,15,15,0.2)] transition duration-100"
      >
        <ul>
          <li
            onClick={() => {
              deleteTemplateById(templateId).then((data) => {
                if (data?.error) {
                  console.error(data.error)
                }
              })
            }}
            className="flex cursor-pointer items-center gap-[4px] rounded-sm p-[4px] font-medium text-red-500 transition duration-100 hover:bg-red-100"
          >
            <span>
              <BiTrash className="h-[20px] w-[20px]" />
            </span>
            <span>Delete Template</span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
