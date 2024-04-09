'use client'

import { MouseEvent, useState } from 'react'

import { Template } from '@prisma/client'
import { Modal, useModal } from '@/components/ui/modal'
import TemplateSelect from './template-select'
import ClientSearchDropdown from './clients-search-dropdown'
import { useFormState } from 'react-dom'
import { createApplication } from '@/lib/actions/application'
import { InputLabel, TextInput } from '@/components/ui/inputs'
import { Button, SubmitButton } from '@/components/ui/buttons'

interface CreateNewApplicationModalProps {
  templates: Template[]
  orgName: string
}

export default function CreateNewApplicationModal({
  templates,
  orgName,
}: CreateNewApplicationModalProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const createApplicationWithClient = createApplication.bind(
    null,
    selectedClientId,
    selectedTemplateId
  )
  const [formState, dispatch] = useFormState(createApplicationWithClient, {})
  const { closeModal } = useModal()

  const handleClientSelect = (client: string) => {
    setSelectedClientId(client)
  }

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplateId(template)
  }

  const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setSelectedClientId('')
    setSelectedTemplateId('')
    closeModal()
  }

  return (
    <Modal title="Create a new application">
      <form
        className="w-[35vw] max-w-[570px]"
        action={async (formData: FormData) => {
          dispatch(formData)
          closeModal()
        }}
      >
        <ClientSearchDropdown
          orgName={orgName}
          selectedClientId={selectedClientId}
          setSelectedClientId={handleClientSelect}
        />
        <div className="my-[14px] text-[14px]">
          <InputLabel htmlFor="role" className="mb-[4px]">
            Role
          </InputLabel>
          <select
            name="role"
            id="role"
            className="w-full rounded-sm border border-n-400 px-[8px] py-[3px]"
            defaultValue=""
          >
            <option value="" disabled>
              --Select--
            </option>
            <option value="MAIN">Main</option>
            <option value="SPOUSE">Spouse</option>
            <option value="CHILD">Child</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="mb-[14px] grid grid-flow-col gap-[14px] text-[14px]">
          <div>
            <InputLabel htmlFor="applicantFirstName" className="mb-[4px]">
              Applicant First Name
            </InputLabel>
            <TextInput
              name="applicantFirstName"
              id="applicant-first-name"
              placeholder="Jane"
              size="xs"
              className="rounded-sm border-n-400 px-[8px] py-[3px]"
            />
          </div>
          <div>
            <InputLabel htmlFor="applicantLastName" className="mb-[4px]">
              Applicant Last Name
            </InputLabel>
            <TextInput
              name="applicantLastName"
              id="applicant-last-name"
              placeholder="Cooper"
              size="xs"
              className="rounded-sm border-n-400 px-[8px] py-[3px]"
            />
          </div>
        </div>
        <TemplateSelect
          templates={templates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={handleTemplateSelect}
        />
        <div className="mt-[10px] flex justify-center gap-[8px]">
          <Button
            size="full"
            type="reset"
            className="rounded-md px-[12px] py-[6px] text-[14px] font-bold text-n-700"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <SubmitButton
            size="full"
            className="rounded-md bg-n-600 px-[12px] py-[6px] text-[14px] font-bold text-white hover:bg-n-700"
          >
            Create
          </SubmitButton>
        </div>
      </form>
    </Modal>
  )
}
