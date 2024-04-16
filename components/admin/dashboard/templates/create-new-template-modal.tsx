'use client'

import { MouseEvent, useState } from 'react'

import { createTemplateInOrganization } from '@/lib/actions/template'
import { Modal, useModal } from '../../../ui/modal'

interface CreateNewTemplateModalProps {
  orgName: string
}

export default function CreateNewTemplateModal({ orgName }: CreateNewTemplateModalProps) {
  const [formState, setFormState] = useState<any>({})
  const { closeModal } = useModal()

  async function handleCreateTemplate(formData: FormData) {
    createTemplateInOrganization(orgName, formData).then((res) => {
      if (res.success) {
        resetForm()
        closeModal()
      } else {
        setFormState(res)
      }
    })
  }

  function resetForm() {
    setFormState({})
  }

  return (
    <Modal title="Create a new template" onClose={resetForm}>
      <form action={handleCreateTemplate} className="w-[85vw] max-w-[570px]">
        <div className="mb-[12px]">
          <label className="mb-[4px] block text-[14px] text-n-700" htmlFor="title">
            Title
          </label>
          <input
            className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
            placeholder="College Application"
            type="text"
            name="title"
            id="title"
          />
          {formState.errors?.title && <div className="text-red-500">{formState.errors.title}</div>}
        </div>
        <div>
          <label className="mb-[4px] block text-[14px] text-n-700" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
            placeholder="This template is for college applications."
            name="description"
            id="description"
            rows={5}
          />
          {formState.errors?.description && (
            <div className="text-red-500">{formState.errors.description}</div>
          )}
        </div>
        {formState.error && <div className="text-red-500">{formState.error}</div>}
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
          <button
            type="submit"
            className="w-full rounded-md bg-n-600 px-[12px] py-[6px] text-[14px] font-bold text-white transition hover:bg-n-700"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
