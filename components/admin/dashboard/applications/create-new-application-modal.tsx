'use client'

import { MouseEvent, useState } from 'react'

import { Template } from '@prisma/client'
import { Modal, useModal } from '@/components/ui/modal'
import TemplateSelect from './template-select'
import ClientSearchDropdown from './clients-search-dropdown'
import { useFormState } from 'react-dom'
import { createApplication } from '@/lib/actions/application'
import { FormInput, InputLabel, TextInput } from '@/components/ui/inputs'
import { Button, SubmitButton } from '@/components/ui/buttons'
import { Select } from '@/components/ui/select'

interface CreateNewApplicationModalProps {
  templates: Template[]
  orgName: string
}

const options = [
  { index: 0, value: '', name: '--Select--' },
  { index: 1, value: 'MAIN', name: 'Main' },
  { index: 2, value: 'SPOUSE', name: 'Spouse' },
  { index: 3, value: 'CHILD', name: 'Child' },
  { index: 4, value: 'OTHER', name: 'Other' },
]

export default function CreateNewApplicationModal({
  templates,
  orgName,
}: CreateNewApplicationModalProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  //TODO: cleanup application creation server action

  // TODO: change the formState to be able to show errors, similar to client creation form
  // make action have return type of {success: boolean, errors?: any}

  const [formState, setFormState] = useState<any>({})
  const { closeModal } = useModal()

  async function handleCreateApplication(formData: FormData) {
    createApplication(selectedClientId, selectedTemplateId, formData).then((res) => {
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

  function handleClientSelect(client: string) {
    setSelectedClientId(client)
  }

  function handleTemplateSelect(template: string) {
    setSelectedTemplateId(template)
  }

  function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setSelectedClientId('')
    setSelectedTemplateId('')
    resetForm()
    closeModal()
  }
  console.log(formState)
  //TODO: Add error handling and display errors
  return (
    <Modal title="Create a new application" onClose={resetForm}>
      <form className="w-[35vw] max-w-[570px]" action={handleCreateApplication}>
        <ClientSearchDropdown
          orgName={orgName}
          selectedClientId={selectedClientId}
          setSelectedClientId={handleClientSelect}
        />
        <div className="my-[14px] text-[14px]">
          <InputLabel htmlFor="role" className="mb-[4px]">
            Role
          </InputLabel>
          {/* TODO: create a custom select component */}
          <Select name="role" id="role" options={options} />
        </div>
        <div className="mb-[14px] grid grid-flow-col gap-[14px] text-[14px]">
          {/* TODO: add formInput ui component */}
          <FormInput
            id="applicant-first-name"
            gap="sm"
            errors={formState.errors?.applicantFirstName}
          >
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
          </FormInput>
          <div>
            <FormInput
              id="applicant-last-name"
              gap="sm"
              errors={formState.errors?.applicantLastName}
            >
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
            </FormInput>
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
