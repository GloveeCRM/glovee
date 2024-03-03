'use client'

import { useState } from 'react'

interface TemplateInfoCardDescriptionProps {
  description: string
  editable?: boolean
}

export default function TemplateInfoCardDescription({
  description,
  editable,
}: TemplateInfoCardDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="m-[8px]">
      {editable && 'editable'}
      <p className={`text-[11px] text-n-300 ${!isOpen ? 'line-clamp-3' : ''}`}>{description}</p>
      {description.length > 85 && (
        <button
          className="mt-[8px] text-[11px] text-n-100 underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}
