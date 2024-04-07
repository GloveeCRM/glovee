import { GoPlus } from 'react-icons/go'

import { ModalProvider, ModalTrigger } from '@/components/ui/modal'
import CreateNewClientModal from './create-new-client-modal'

export default function CreateNewClientButton() {
  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="group flex h-[36px] w-[130px] cursor-pointer items-center justify-center gap-[4px] rounded border border-n-600 text-n-600 hover:border-n-800 hover:font-medium hover:text-n-800">
          <GoPlus className="h-[20px] w-[20px] text-n-600 group-hover:text-n-800" />
          <h1>New Client</h1>
        </div>
      </ModalTrigger>
      <CreateNewClientModal />
    </ModalProvider>
  )
}
