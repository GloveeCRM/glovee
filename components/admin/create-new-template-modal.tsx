import Modal from '../ui/modal'

export default function CreateNewTemplateModal({
  showModal,
  onClose,
}: {
  showModal: boolean
  onClose: () => void
}) {
  return (
    <Modal showModal={showModal} title="Create a new template" onClose={onClose}>
      <form className="w-[85vw] max-w-[570px]">
        <div className="mb-[12px]">
          <label className="text-n-700 mb-[4px] block text-[14px]" htmlFor="title">
            Title
          </label>
          <input
            className="border-n-400 w-full rounded border px-[8px] py-[3px] text-[14px] leading-tight"
            placeholder="College Application"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div>
          <label className="text-n-700 mb-[4px] block text-[14px]" htmlFor="description">
            Description
          </label>
          <textarea
            className="border-n-400 w-full rounded border px-[8px] py-[3px] text-[14px] leading-tight"
            placeholder="This template is for college applications."
            name="description"
            id="description"
            rows={5}
          />
        </div>
        <div className="mt-[10px] flex justify-center gap-[8px]">
          <button
            className="bg-n-200 hover:bg-n-400 text-n-700 w-full rounded-md px-[12px] py-[6px] text-[14px] font-bold transition"
            type="reset"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            Cancel
          </button>
          <button className="bg-n-600 hover:bg-n-700 w-full rounded-md px-[12px] py-[6px] text-[14px] font-bold text-white transition">
            Create
          </button>
        </div>
      </form>
    </Modal>
  )
}
