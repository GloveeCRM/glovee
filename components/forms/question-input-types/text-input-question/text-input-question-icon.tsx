'use client'

import Divider from '@/components/ui/divider'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'

export default function TextInputQuestionIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'question')
    setDraggedObject({
      type: 'question',
      object: {
        type: 'textInput',
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-n-200 px-[6px] py-[4px] text-[12px] text-n-600"
      draggable
      onDragStart={handleDragStart}
    >
      <span className="text-[12px]">Text Input</span>
      <div className="mb-[2px] mt-[4px] flex flex-col gap-[2px]">
        <div className="flex w-[35px] items-center">
          <Divider className="mb-[2px] border-n-500" size={2} />
        </div>
        <div className="flex h-[20px] rounded-sm border-[1px] border-n-600"></div>
      </div>
    </div>
  )
}
