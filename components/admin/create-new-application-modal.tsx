'use client'

import { createApplication } from '@/lib/actions/application'
import Modal from '../ui/modal'

export default function CreateNewApplicationModal({
  isOpen,
  onClose,
  templates,
}: {
  isOpen: boolean
  onClose: () => void
  templates: any[] | null
}) {
  async function handleCreateApplication(formData: FormData) {
    createApplication(formData)
      .then((data) => {
        onClose()
        if (data.success) {
          alert('Application created successfully')
        } else {
          alert('Application creation failed')
        }
      })
      .catch((err) => {
        alert('Application creation failed miserably')
      })
  }

  return (
    <Modal isOpen={isOpen} title="Create a new Application" onClose={onClose}>
      <form action={handleCreateApplication}>
        <div>
          <label htmlFor="clientEmail">Add client email</label>
          <input type="text" name="clientEmail" id="clientEmail" className=" border border-black" />
        </div>
        <div>
          <label htmlFor="templateId">Choose a template:</label>
          <select name="templateId" id="templateId">
            {templates?.map((template) => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-[10px] flex justify-center gap-[8px]">
          <button
            className="w-full rounded-md bg-n-200 px-[12px] py-[6px] text-[14px] font-bold text-n-700 transition hover:bg-n-400"
            type="reset"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
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
