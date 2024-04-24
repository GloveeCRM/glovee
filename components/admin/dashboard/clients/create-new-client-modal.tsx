'use client'

import { MouseEvent, useState } from 'react'

import { createClientInOrg } from '@/lib/actions/user'
import { Modal, useModal } from '@/components/ui/modal'
import { FormInput, InputLabel, TextInput } from '@/components/ui/inputs'
import { Button, SubmitButton } from '@/components/ui/buttons'
import { Callout } from '@/components/ui/callout'
import { BiMessageSquareError } from 'react-icons/bi'
import { useOrgContext } from '@/contexts/org-context'

export default function CreateNewClientModal() {
  const { orgName } = useOrgContext()
  const [formState, setFormState] = useState<any>({})
  const { closeModal } = useModal()

  async function handleCreateClient(formData: FormData) {
    createClientInOrg(formData, orgName).then((res) => {
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

  function handleCloseModal(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    resetForm()
    closeModal()
  }
  return (
    <Modal title="Create a new client" onClose={resetForm}>
      <form action={handleCreateClient} className="w-[85vw] max-w-[450px]">
        <div className="mb-[18px]">
          <div className="mb-[20px] grid grid-flow-col gap-[12px]">
            <FormInput id="client-first-name" gap="sm" errors={formState.errors?.clientFirstName}>
              <InputLabel htmlFor="clientFirstName" className="text-n-700">
                First Name
              </InputLabel>
              <TextInput
                size="xs"
                name="clientFirstName"
                id="client-first-name"
                placeholder="Jane"
                className="rounded-sm border-n-400 px-[8px] py-[3px] text-[14px]"
              />
            </FormInput>
            <FormInput id="client-last-name" gap="sm" errors={formState.errors?.clientLastName}>
              <InputLabel htmlFor="clientLastName" className="text-n-700">
                Last Name
              </InputLabel>
              <TextInput
                size="xs"
                name="clientLastName"
                id="client-last-name"
                placeholder="Cooper"
                className="rounded-sm border-n-400 px-[8px] py-[3px] text-[14px]"
              />
            </FormInput>
          </div>
          <FormInput id="client-email" gap="sm" errors={formState.errors?.clientEmail[0]}>
            <InputLabel htmlFor="clientEmail" className="text-n-700">
              Client Email
            </InputLabel>
            <TextInput
              size="xs"
              name="clientEmail"
              id="client-email"
              placeholder="jane.cooper@gmail.com"
              className="rounded-sm border-n-400 px-[8px] py-[3px] text-[14px]"
            />
          </FormInput>
        </div>

        {formState.error && (
          <Callout variant="error" className="mb-[12px]">
            <div className="flex items-center gap-[4px]">
              <BiMessageSquareError className="h-[16px] w-[16px]" />
              <span>{formState.error}</span>
            </div>
          </Callout>
        )}

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
