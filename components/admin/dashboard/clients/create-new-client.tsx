import { ModalProvider, ModalTrigger } from '@/components/ui/modal'
import { GoPlus } from 'react-icons/go'
import CreateNewClientModal from './create-new-client-modal'

export default function CreateNewClient() {
  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex items-center rounded border border-n-700 p-[8px]">
          <GoPlus className="h-[20px] w-[20px]" />
          <h1>New Client</h1>
          <CreateNewClientModal />
        </div>
      </ModalTrigger>
    </ModalProvider>
  )
}
