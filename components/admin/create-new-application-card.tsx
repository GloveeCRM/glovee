'use client'

import { useState } from 'react'
import CreateNewApplicationModal from './create-new-application-modal'

export default function CreateNewApplicationCard({ templates }: { templates: any[] }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-n-600 p-[8px] text-[16px] text-n-700">
      <button onClick={() => setShowModal(true)}>Create new application</button>
      <CreateNewApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        templates={templates}
      />
    </div>
  )
}
