import { ModalProvider, ModalTrigger } from '@/components/ui/modal'
import { GoPlus } from 'react-icons/go'
import CreateNewClientModal from './create-new-client-modal'

export default function CreateNewClientButton() {
  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex cursor-pointer items-center gap-[4px] rounded border border-n-700 py-[5px] pl-[8px] pr-[10px]">
          <GoPlus className="h-[20px] w-[20px]" />
          <h1>New Client</h1>
          <CreateNewClientModal />
        </div>
      </ModalTrigger>
    </ModalProvider>
  )
}
