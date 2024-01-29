'use client'

import { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import CreateNewTemplateModal from './create-new-template-modal'

export default function CreateNewTemplateCard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div
      className="border-n-600 text-n-700 flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-[8px] text-[16px]"
      onClick={() => setShowModal(true)}
    >
      <AiOutlineFileAdd className="h-[26px] w-[26px]" />
      <span>Create a new template</span>
      <CreateNewTemplateModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
