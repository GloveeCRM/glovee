'use client'

import { TemplateQuestionType } from '@prisma/client'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import Divider from '@/components/ui/divider'

export default function TextareaQuestionIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'question')
    setDraggedObject({
      type: 'question',
      object: {
        type: TemplateQuestionType.TEXTAREA,
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-[12px]">Textarea</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[35px] items-center">
          <Divider className="border-n-500" size={2} />
        </div>
        <div className="flex h-[22px] rounded-sm border-[1px] border-n-600">
          <div className="mt-[2px] flex">
            <div className="ml-[4px] w-[15px]">
              <Divider className="border-n-500" size={2} />
            </div>
            <div className="ml-[1px] w-[8px]">
              <Divider className="border-n-500" size={2} />
            </div>
            <div className="ml-[1px] w-[5px]">
              <Divider className="border-n-500" size={2} />
            </div>
            <div className="ml-[1px] w-[5px]">
              <Divider className="border-n-500" size={2} />
            </div>
            <div className="ml-[1px] w-[5px]">
              <Divider className="border-n-500" size={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
