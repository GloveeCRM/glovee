import { GoPlus } from 'react-icons/go'

import { fetchTemplatesByUserId } from '@/lib/data/template'
import CreateNewApplicationModal from './create-new-application-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'
import { getAuthenticatedUser } from '@/auth'

interface CreateNewApplicationButtonProp {
  orgName: string
}

export default async function CreateNewApplicationButton({
  orgName,
}: CreateNewApplicationButtonProp) {
  const user = await getAuthenticatedUser()

  if (!user || !user.id) {
    return null
  }

  const templates = (await fetchTemplatesByUserId(user.id)) || []

  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex cursor-pointer items-center gap-[4px] rounded border border-n-700 py-[5px] pl-[8px] pr-[10px]">
          <GoPlus className="h-[20px] w-[20px]" />
          <span>New Application</span>
          <CreateNewApplicationModal templates={templates} orgName={orgName} />
        </div>
      </ModalTrigger>
    </ModalProvider>
  )
}
