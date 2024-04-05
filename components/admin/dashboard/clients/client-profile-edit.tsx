import { MouseEvent } from 'react'

interface ClientProfileEditProps {
  setIsEditing: (isEditing: boolean) => void
  client: any
}

export default function ClientProfileEdit({ setIsEditing, client }: ClientProfileEditProps) {
  const fullName = client.name
  const firstName = fullName.split(' ')[0]
  const lastName = fullName.split(' ')[1]
  return (
    <form action="">
      <div>
        <div className="mb-[10px] grid grid-flow-col gap-[8px]">
          <div>
            <label htmlFor="clientFirstName" className="mb-[4px] block text-[14px] text-n-700">
              First Name
            </label>
            <input
              type="text"
              name="clientFirstName"
              id="client-first-name"
              defaultValue={firstName}
              className="w-full rounded-sm border border-n-400 bg-n-100/50 px-[8px] py-[4px] text-[14px]"
            />
          </div>
          <div>
            <label htmlFor="clientLastName" className="mb-[4px] block text-[14px] text-n-700">
              Last Name
            </label>
            <input
              type="text"
              name="clientLastName"
              id="client-last-name"
              defaultValue={lastName}
              className="w-full rounded-sm border border-n-400 bg-n-100/50 px-[8px] py-[4px] text-[14px]"
            />
          </div>
        </div>
        <label htmlFor="clientEmail" className="mb-[4px] block text-[14px] text-n-700">
          Email
        </label>
        <input
          type="text"
          name="clientEmail"
          id="clientEmail"
          defaultValue={client.email}
          className="w-full rounded-sm border border-n-400 bg-n-100/50 px-[8px] py-[4px] text-[14px]"
        />
      </div>

      <div className="mt-[10px] flex justify-center gap-[8px]">
        <button
          className="rounded-sm bg-n-200 px-[20px] py-[6px] text-[14px] font-bold text-n-700 transition hover:bg-n-400"
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
          className="rounded-sm bg-n-600 px-[20px] py-[6px] text-[14px] font-bold text-white transition hover:bg-n-700"
        >
          Create
        </button>
      </div>
    </form>
  )
}
