import { FiPlus } from 'react-icons/fi'

import { FormQuestionSetTypes } from '@/lib/types/form'
import { useDragAndDropContext } from '@/contexts/drag-and-drop-context'

export default function RepeatableQuestionSetIcon() {
  const { setDraggedObject } = useDragAndDropContext()

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'questionSet')
    setDraggedObject({
      type: 'questionSet',
      object: {
        type: FormQuestionSetTypes.REPEATABLE,
      },
    })
  }

  return (
    <div
      className="skew-x-0 rounded bg-r-500 p-[4px] text-n-800"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex h-[38px] items-center justify-center rounded-sm bg-r-200">
        <span className="text-[12px] font-medium">Repeatable</span>
      </div>
      <div className="mt-[4px] flex items-center justify-center">
        <span>
          <FiPlus className="h-[12px] w-[12px]" />
        </span>
        <span className="text-[8px]">Add another one</span>
      </div>
    </div>
  )
}
