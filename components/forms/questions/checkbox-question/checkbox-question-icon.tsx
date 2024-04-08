'use client'

import { PiCheckBold } from 'react-icons/pi'

import Divider from '@/components/ui/divider'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'

export default function CheckboxQuestionIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'question')
    setDraggedObject({
      type: 'question',
      object: {
        type: 'checkbox',
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-[12px]">Checkbox</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[95px] items-center">
          <div className="h-[12px] w-[12px] flex-shrink-0 rounded-sm border-[1px] border-n-600" />
          <Divider className="ml-[5px] border-n-500" size={2} />
        </div>
        <div className="flex w-[75px] items-center">
          <div className="flex h-[12px] w-[12px] flex-shrink-0 items-center justify-center rounded-sm border-[1px] border-n-600 bg-n-600">
            <PiCheckBold className="h-[10px] w-[10px] text-n-200" />
          </div>
          <Divider className="ml-[5px] border-n-500" size={2} />
        </div>
      </div>
    </div>
  )
}