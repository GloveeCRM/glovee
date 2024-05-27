import { GoPlus } from 'react-icons/go'

import { UserType } from '@/lib/types/user'
import { searchTemplates } from '@/lib/data/template'
import { ModalProvider, ModalTrigger } from '@/components/ui/modal'
import CreateNewApplicationModal from './create-new-application-modal'
import { Button } from '@/components/ui/button'

interface CreateNewApplicationButtonProp {
  orgName: string
  client?: UserType
}

export default async function CreateNewApplicationButton({
  orgName,
  client,
}: CreateNewApplicationButtonProp) {
  return (
    <ModalProvider>
      <ModalTrigger>
        <Button variant="outline">
          <GoPlus className="mr-[6px] h-[20px] w-[20px]" />
          <span>New Application</span>
        </Button>
        <CreateNewApplicationModal orgName={orgName} client={client} />
      </ModalTrigger>
    </ModalProvider>
  )
}
