'use client'

import { useState } from 'react'

export default function EmptySectionQuestionSetDropzone() {
  const [isDropAllowed, setIsDropAllowed] = useState<boolean>(false)

  const customDashedBorderStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='${isDropAllowed ? '%23666666FF' : '%23B1B2B2FF'}' stroke-width='2' stroke-dasharray='5' stroke-dashoffset='54' stroke-linecap='square'/%3e%3c/svg%3e")`,
    borderRadius: '6px',
  }

  return (
    <div
      className={`flex h-[150px] items-center justify-center font-medium text-n-600 transition duration-75 ${isDropAllowed && 'bg-n-200/70 text-n-700'}`}
      style={customDashedBorderStyle}
      onDragEnter={(e) => {
        e.preventDefault()
        setIsDropAllowed(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setIsDropAllowed(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
      }}
    >
      Drag a Question Type Here
    </div>
  )
}
