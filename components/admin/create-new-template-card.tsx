'use client'

import { AiOutlineFileAdd } from 'react-icons/ai'

export default function CreateNewTemplateCard() {
  return (
    <div
      className="border-n-600 text-n-700 flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-[8px] text-[16px]"
      onClick={() => {
        console.log('clicked')
      }}
    >
      <AiOutlineFileAdd className="h-[26px] w-[26px]" />
      <span>Create a new template</span>
    </div>
  )
}
