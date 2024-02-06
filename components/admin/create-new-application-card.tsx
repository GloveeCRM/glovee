'use client'

import { useState } from 'react'
import CreateNewApplicationModal from './create-new-application-modal'

export default function CreateNewApplicationCard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="bg-red-500">
      <button onClick={() => setShowModal(true)}>Create new application</button>
      <CreateNewApplicationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
