import { MouseEvent } from 'react'

interface ClientProfileEditProps {
  setIsEditing: (isEditing: boolean) => void
}

export default function ClientProfileEdit({ setIsEditing }: ClientProfileEditProps) {
  return (
    <form action="">
      <div>
        <div className="grid grid-flow-col gap-[4px]">
          <label htmlFor="clientFirstName">First Name</label>
          <input type="text" name="clientFirstName" id="client-first-name" />
          <label htmlFor="clientLastName">Last Name</label>
          <input type="text" name="clientLastName" id="client-last-name" />
        </div>
        <label htmlFor="clientEmail">Email</label>
        <input type="text" name="clientEmail" id="clientEmail" />
      </div>

      <div className="mt-[10px] flex justify-center gap-[8px]">
        <button
          className="w-full rounded-md bg-n-200 px-[12px] py-[6px] text-[14px] font-bold text-n-700 transition hover:bg-n-400"
          type="reset"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setIsEditing(false)
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
  )
}
