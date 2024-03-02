import { AiOutlineFileAdd } from 'react-icons/ai'

import CreateNewTemplateModal from './create-new-template-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'

export default function CreateNewTemplateCard() {
  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-n-600 p-[8px] text-[16px] text-n-700">
          <AiOutlineFileAdd className="h-[26px] w-[26px]" />
          <span>Create a new template</span>
        </div>
      </ModalTrigger>
      <CreateNewTemplateModal />
    </ModalProvider>
  )
}
