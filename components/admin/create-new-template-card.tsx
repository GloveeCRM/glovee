'use client'

import { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import CreateNewTemplateModal from './create-new-template-modal'

export default function CreateNewTemplateCard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div
      className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-n-600 p-[8px] text-[16px] text-n-700"
      onClick={() => setShowModal(true)}
    >
      <AiOutlineFileAdd className="h-[26px] w-[26px]" />
      <span>Create a new template</span>
      <CreateNewTemplateModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
