import Modal from '../ui/modal'
import { TEMPLATES } from '@/lib/constants/applications'

export default function CreateNewApplicationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} title="Create a new Application" onClose={onClose}>
      <form action="">
        <div>
          <label htmlFor="email">Add client email</label>
          <input type="text" name="email" id="email" className=" border border-black" />
        </div>
        <div>
          <label htmlFor="templates">Choose a template:</label>
          <select name="templates" id="templates">
            {TEMPLATES.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
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
