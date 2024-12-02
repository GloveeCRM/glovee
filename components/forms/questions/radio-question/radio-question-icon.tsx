'use client'

import { FormQuestionTypes } from '@/lib/types/form'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { Divider } from '@/components/ui/divider'

export default function RadioQuestionIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'question')
    setDraggedObject({
      type: 'question',
      object: {
        type: FormQuestionTypes.RADIO,
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-[12px]">Radio</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[95px] items-center">
          <div className="h-[12px] w-[12px] flex-shrink-0 rounded-full border-[1px] border-n-600" />
          <Divider className="ml-[5px] border-n-500" size={2} />
        </div>
        <div className="flex w-[75px] items-center">
          <div className="flex h-[12px] w-[12px] flex-shrink-0 items-center justify-center rounded-full border-[1px] border-n-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-n-600" />
          </div>
          <Divider className="ml-[5px] border-n-500" size={2} />
        </div>
      </div>
    </div>
  )
}
