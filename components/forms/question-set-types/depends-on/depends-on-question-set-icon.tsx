'use client'

import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'

export default function DependsOnQuestionSetIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'questionSet')
    setDraggedObject({
      type: 'questionSet',
      object: {
        type: 'dependsOn',
      },
    })
  }

  return (
    <div
      className="flex skew-x-0 flex-col gap-[4px] rounded bg-b-500 p-[4px] text-n-800"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex h-[30px] items-center justify-center rounded-sm bg-n-200">
        <span className="text-[12px] font-medium">Depends On</span>
      </div>
      <div className="flex h-[20px] items-center justify-center bg-b-300">
        <span className="text-[8px] text-n-800/70">Drop a question set here</span>
      </div>
    </div>
  )
}
