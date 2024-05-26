import { GoPlus } from 'react-icons/go'

import { UserType } from '@/lib/types/user'
import { searchTemplates } from '@/lib/data/template'
import { ModalProvider, ModalTrigger } from '@/components/ui/modal'
import CreateNewApplicationModal from './create-new-application-modal'

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
        <div className="flex cursor-pointer items-center gap-[4px] rounded border border-n-700 py-[5px] pl-[8px] pr-[10px] transition duration-75 hover:bg-n-700 hover:text-n-100">
          <GoPlus className="h-[20px] w-[20px]" />
          <span>New Application</span>
        </div>
        <CreateNewApplicationModal orgName={orgName} client={client} />
      </ModalTrigger>
    </ModalProvider>
  )
}
