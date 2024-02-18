'use client'

import { useState } from 'react'

export default function TemplateInfoCardDescription({ description }: { description: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <p className={`mt-[8px] text-[11px] text-n-300 ${!isOpen ? 'line-clamp-3' : ''}`}>
        {description}
      </p>
      {description.length > 85 && (
        <button
          className="mt-[8px] text-[11px] text-n-100 underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  )
}
