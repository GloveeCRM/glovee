'use client'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'
import { TemplateQuestionSetType } from '@prisma/client'

export default function FlatQuestionSetIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'questionSet')
    setDraggedObject({
      type: 'questionSet',
      object: {
        type: TemplateQuestionSetType.FLAT,
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-g-500 p-[4px] text-n-800"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex h-[54px] items-center justify-center rounded-sm bg-g-200">
        <span className="text-[12px] font-medium">Flat</span>
      </div>
    </div>
  )
}
