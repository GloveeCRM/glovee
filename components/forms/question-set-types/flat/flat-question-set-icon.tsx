'use client'

export default function FlatQuestionSetIcon() {
  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('objectType', 'questionSet')
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
