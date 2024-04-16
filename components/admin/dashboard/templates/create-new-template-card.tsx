import { AiOutlineFileAdd } from 'react-icons/ai'

import CreateNewTemplateModal from './create-new-template-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'

interface CreateNewTemplateCardProps {
  orgName: string
}

export default function CreateNewTemplateCard({ orgName }: CreateNewTemplateCardProps) {
  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-n-500 p-[8px] text-[16px]">
          <AiOutlineFileAdd className="h-[26px] w-[26px]" />
          <span>Create a new template</span>
        </div>
      </ModalTrigger>
      <CreateNewTemplateModal orgName={orgName} />
    </ModalProvider>
  )
}
