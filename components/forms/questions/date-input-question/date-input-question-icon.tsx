'use client'

import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { TemplateQuestionTypes } from '@/lib/types/template'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import Divider from '@/components/ui/divider'

export default function DateInputQuestionIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'question')
    setDraggedObject({
      type: 'question',
      object: {
        type: TemplateQuestionTypes.DATE_INPUT,
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-[12px]">Date Input</span>
      <div className="mb-[2px] mt-[6px] flex gap-[6px]">
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-[20px] items-center">
            <Divider className="mb-[2px] border-n-500" size={2} />
          </div>
          <div className="flex h-[20px] items-center justify-end rounded-sm border-[1px] border-n-600">
            <span>
              <MdOutlineKeyboardArrowDown className="h-[20px] w-[20px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
