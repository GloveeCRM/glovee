'use client'

import { MouseEvent } from 'react'

import { Template } from '@prisma/client'
import { Modal, useModal } from '@/components/ui/modal'
import TemplateSelect from './template-select'
import ClientSearchDropdown from './clients-search-dropdown'

interface CreateNewApplicationModalProps {
  templates: Template[]
  orgName: string
}

export default function CreateNewApplicationModal({
  templates,
  orgName,
}: CreateNewApplicationModalProps) {
  const { closeModal } = useModal()

  return (
    <Modal title="Create a new application">
      <form className="w-[85vw] max-w-[570px]">
        <ClientSearchDropdown orgName={orgName} />
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
              className="w-full rounded border border-n-400  px-[8px] py-[3px] text-[14px] leading-tight"
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
