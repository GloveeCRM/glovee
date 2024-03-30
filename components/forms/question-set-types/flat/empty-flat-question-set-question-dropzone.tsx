'use client'

import { useState } from 'react'

export default function EmptyFlatQuestionSetQuestionDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

  return (
    <div
      className={`rounded border-[1px] border-dashed ${isDraggedOver ? 'border-n-600 bg-g-200' : 'border-n-500 bg-g-200/80'}`}
    >
      <div
        className="flex h-[65px] items-center justify-center text-center text-[12px]"
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDraggedOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDraggedOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          console.log('drop')
        }}
      >
        Drag an Input Type Here
      </div>
    </div>
  )
}
