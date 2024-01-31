'use client'

import { useState } from 'react'

export default function TemplateInfoCard({ template }: { template: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <p>{template?.title}</p>
      <p className={!isOpen ? 'line-clamp-3' : ''}>{template?.description}</p>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Show less' : 'Show more'}</button>
    </div>
  )
}
