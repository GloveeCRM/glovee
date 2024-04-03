'use client'

import { MouseEvent } from 'react'

import { Modal, useModal } from '@/components/ui/modal'
import { createClient } from '@/lib/actions/user'
import { useFormState } from 'react-dom'

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
            <div>
              <label className="mb-[4px] block text-[14px] text-n-700" htmlFor="clientEmail">
                First Name
              </label>
              <input
                type="text"
                name="clientFirstName"
                id="client-first-name"
                placeholder="Jane"
                className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]"
              />
            </div>
            <div>
              <label className="mb-[4px] block text-[14px] text-n-700" htmlFor="clientName">
                Last Name
              </label>
              <input
                type="text"
                name="clientLastName"
                id="client-last-name"
                placeholder="Cooper"
                className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]"
              />
            </div>
          </div>
          <label className="mb-[4px] block text-[14px] text-n-700" htmlFor="clientEmail">
            Client Email
          </label>
          <input
            type="text"
            name="clientEmail"
            id="clientEmail"
            placeholder="jane.cooper@gmail.com"
            className="w-full rounded-sm border border-n-400 px-[8px] py-[3px] text-[14px]"
          />
          {formState.error?.clientEmail && (
            <div className="text-red-500">{formState.errors.clientEmail}</div>
          )}
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
