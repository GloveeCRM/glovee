'use client'

import { MouseEvent } from 'react'

import { Template } from '@prisma/client'
import { createApplication } from '@/lib/actions/application'
import { Modal, useModal } from '@/components/ui/modal'
import TemplateSelect from './template-select'

export default function CreateNewApplicationModal({ templates }: { templates: Template[] }) {
  const { closeModal } = useModal()

  // async function handleCreateApplication(formData: FormData) {
  //   createApplication(formData)
  //     .then((data) => {
  //       closeModal()
  //       if (data.success) {
  //         alert('Application created successfully')
  //       } else {
  //         alert('Application creation failed')
  //       }
  //     })
  //     .catch((err) => {
  //       alert('Application creation failed miserably')
  //     })
  // }

  return (
    <Modal title="Create a new application">
      <form className="w-[85vw] max-w-[570px]">
        <div>
          <label htmlFor="client-name" className="mb-[4px] block text-[14px] text-n-700">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            id="client-name"
            className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-[4px] block text-[14px] text-n-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
          >
            <option value="MAIN">Main</option>
            <option value="SPOUSE">Spouse</option>
            <option value="CHILD">Child</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div>
            <label htmlFor="applicantFirstName" className="mb-[4px] block text-[14px] text-n-700">
              Applicant First Name
            </label>
            <input
              type="text"
              name="applicantFirstName"
              id="applicant-first-name"
              className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
            />
          </div>
          <div>
            <label htmlFor="applicantLastName" className="mb-[4px] block text-[14px] text-n-700">
              Applicant Last Name
            </label>
            <input
              type="text"
              name="applicantLastName"
              id="applicant-last-name"
              className="w-full rounded border border-n-400 px-[8px] py-[3px] text-[14px] leading-tight"
            />
          </div>
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
