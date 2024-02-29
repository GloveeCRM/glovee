'use client'

import { MouseEvent } from 'react'

import { createApplication } from '@/lib/actions/application'
import { Modal, useModal } from '../ui/modal'
import { Template } from '@prisma/client'
import TemplateSelect from './template-select'

export default function CreateNewApplicationModal({ templates }: { templates: Template[] }) {
  const { closeModal } = useModal()

  async function handleCreateApplication(formData: FormData) {
    createApplication(formData)
      .then((data) => {
        closeModal()
        if (data.success) {
          alert('Application created successfully')
        } else {
          alert('Application creation failed')
        }
      })
      .catch((err) => {
        alert('Application creation failed miserably')
      })
  }

  return (
    <Modal title="Create a new application">
      <form action={handleCreateApplication} className="w-[85vw] max-w-[570px]">
        <div>
          <label htmlFor="clientEmail">Add client email</label>
          <input type="text" name="clientEmail" id="clientEmail" className=" border border-black" />
        </div>
        <TemplateSelect templates={templates} />
        <div className="mt-[10px] flex justify-center gap-[8px]">
          <button
            className="w-full rounded-md bg-n-200 px-[12px] py-[6px] text-[14px] font-bold text-n-700 transition hover:bg-n-400"
            type="reset"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              closeModal()
            }}
          >
            Cancel
          </button>
          <button className="w-full rounded-md bg-n-600 px-[12px] py-[6px] text-[14px] font-bold text-white transition hover:bg-n-700">
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
