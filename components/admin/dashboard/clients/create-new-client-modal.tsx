'use client'

import { MouseEvent } from 'react'

import { Modal, useModal } from '@/components/ui/modal'
import { createClient } from '@/lib/actions/user'

export default function CreateNewClientModal() {
  const { closeModal } = useModal()

  async function handleCreateClient(formData: FormData) {
    createClient(formData)
      .then((data) => {
        closeModal()
        if (data.success) {
          alert('Client created successfully')
        } else {
          alert('Client creation failed')
        }
      })
      .catch((err) => {
        alert('Client creation failed miserably')
      })
  }

  return (
    <Modal title="Create a new client">
      <form action={handleCreateClient} className="w-[85vw] max-w-[570px]">
        <div>
          <div className="flex">
            <div>
              <label htmlFor="clientEmail">First Name</label>
              <input
                type="text"
                name="clientFirstName"
                id="client-first-name"
                className=" border border-black"
              />
            </div>
            <div>
              <label htmlFor="clientName">Last Name</label>
              <input
                type="text"
                name="clientLastName"
                id="client-last-name"
                className=" border border-black"
              />
            </div>
          </div>
          <label htmlFor="clientEmail">Client Email</label>
          <input type="text" name="clientEmail" id="clientEmail" className=" border border-black" />
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
          <button className="w-full rounded-md bg-n-600 px-[12px] py-[6px] text-[14px] font-bold text-white transition hover:bg-n-700">
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
