'use client'

import { MouseEvent } from 'react'
import { useFormState } from 'react-dom'

import { createClient } from '@/lib/actions/user'
import { Modal, useModal } from '@/components/ui/modal'
import { FormInput, InputLabel, TextInput } from '@/components/ui/inputs'

export default function CreateNewClientModal() {
  const [formState, dispatch] = useFormState(createClient, {})
  const { closeModal } = useModal()

  return (
    <Modal title="Create a new client">
      <form
        action={async (formData: FormData) => {
          dispatch(formData)
          closeModal()
        }}
        className="w-[85vw] max-w-[450px]"
      >
        <div className="mb-[18px]">
          <div className="mb-[20px] grid grid-flow-col gap-[12px]">
            <FormInput id="client-first-name" gap="sm" error={'error first name'}>
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
            <FormInput id="client-last-name" gap="sm" error={'error last name'}>
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
          <FormInput id="client-email" gap="sm" error={'error email'}>
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
          {/* {formState.error?.clientEmail && (
            <div className="text-red-500">{formState.errors.clientEmail}</div>
          )} */}
        </div>
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
