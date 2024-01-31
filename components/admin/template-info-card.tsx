'use client'

import { useState } from 'react'

export default function TemplateInfoCard({
  template,
  className,
}: {
  template: any
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${className} rounded bg-n-600 p-[8px]`}>
      <p className="text-[14px] text-n-100">{template?.title}</p>
      <p className={`mt-[8px] text-[11px] text-n-300 ${!isOpen ? 'line-clamp-3' : ''}`}>
        {template?.description}
      </p>
      {template?.description?.length > 85 && (
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
