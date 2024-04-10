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

const roleOptions = [
  { id: 1, value: 'MAIN', name: 'Main' },
  { id: 2, value: 'SPOUSE', name: 'Spouse' },
  { id: 3, value: 'CHILD', name: 'Child' },
  { id: 4, value: 'OTHER', name: 'Other' },
]

export default function CreateNewApplicationModal({
  templates,
  orgName,
}: CreateNewApplicationModalProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>('')
  //TODO: cleanup application creation server action

  // TODO: change the formState to be able to show errors, similar to client creation form
  // make action have return type of {success: boolean, errors?: any}

  const [formState, setFormState] = useState<any>({})
  const { closeModal } = useModal()

  async function handleCreateApplication(formData: FormData) {
    createApplication(selectedClientId, formData).then((res) => {
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

  function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setSelectedClientId('')
    resetForm()
    closeModal()
  }
  console.log(formState)
  console.log(formState.error)
  return (
    <Modal title="Create a new application" onClose={resetForm}>
      <form className="w-[35vw] max-w-[570px]" action={handleCreateApplication}>
        <ClientSearchDropdown
          orgName={orgName}
          selectedClientId={selectedClientId}
          setSelectedClientId={handleClientSelect}
        />
        <div className="my-[14px]">
          <FormInput errors={formState.errors?.role}>
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select name="role" id="role" options={roleOptions} />
          </FormInput>
        </div>
        <div className="mb-[14px] grid grid-flow-col gap-[14px] text-[14px]">
          <FormInput
            id="applicant-first-name"
            gap="sm"
            errors={formState.errors?.applicantFirstName}
          >
            <InputLabel htmlFor="applicantFirstName">Applicant First Name</InputLabel>
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
              <InputLabel htmlFor="applicantLastName">Applicant Last Name</InputLabel>
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

        <TemplateSelect templates={templates} errors={formState.errors?.templateId} />
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
