import { MouseEvent, useState } from 'react'

import { updateClientProfile } from '@/lib/actions/user'
import { FormInput, InputLabel, TextInput } from '@/components/ui/inputs'
import { Button, SubmitButton } from '@/components/ui/buttons'
import { UserType } from '@/lib/types/user'

interface ClientProfileEditProps {
  setIsEditing: (isEditing: boolean) => void
  client: UserType
}

export default function ClientProfileEdit({ setIsEditing, client }: ClientProfileEditProps) {
  const [formState, setFormState] = useState<any>({})

  async function handleUpdateClientById(formData: FormData) {
    updateClientProfile(client.id, formData).then((res) => {
      if (res.success) {
        resetForm()
        setIsEditing(false)
      } else {
        setFormState(res)
      }
    })
  }

  function resetForm() {
    setFormState({})
  }

  return (
    <form action={handleUpdateClientById}>
      <div>
        <div className="mb-[10px] grid grid-flow-col gap-[8px]">
          <FormInput id="client-name" gap="sm" errors={formState.errors?.clientFirstName}>
            <InputLabel htmlFor="clientFirstName">First Name</InputLabel>
            <TextInput
              placeholder="first name"
              id="client-first-name"
              name="clientFirstName"
              defaultValue={client.firstName}
              size="xs"
              className="bg-n-100/50 px-[8px] py-[4px] text-[14px]"
            />
          </FormInput>
          <FormInput id="client-last-name" gap="sm" errors={formState.errors?.clientLastName}>
            <InputLabel htmlFor="clientLastName">Last Name</InputLabel>
            <TextInput
              placeholder="last name"
              id="client-last-name"
              name="clientLastName"
              defaultValue={client.lastName}
              size="xs"
              className="bg-n-100/50 px-[8px] py-[4px] text-[14px]"
            />
          </FormInput>
        </div>
        <FormInput id="client-email" gap="sm" errors={formState.errors?.clientEmail}>
          <InputLabel htmlFor="clientEmail">Email</InputLabel>
          <TextInput
            placeholder="email"
            name="clientEmail"
            id="client-email"
            defaultValue={client.email || ''}
            className="bg-n-100/50 px-[8px] py-[4px] text-[14px]"
          />
        </FormInput>
      </div>
      <div className="mt-[10px] flex justify-center gap-[8px]">
        <Button
          type="reset"
          size="full"
          className="px-[20px] py-[6px] font-bold text-n-700"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setIsEditing(false)
          }}
        >
          Cancel
        </Button>
        <SubmitButton
          size="full"
          className="bg-n-600 px-[20px] py-[6px] font-bold text-white hover:bg-n-700"
        >
          Save
        </SubmitButton>
      </div>
    </form>
  )
}
