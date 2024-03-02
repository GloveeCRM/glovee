import { IoNewspaperOutline } from 'react-icons/io5'

import { fetchTemplatesByUserId } from '@/lib/data/template'
import CreateNewApplicationModal from './create-new-application-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'
import { getAuthenticatedUser } from '@/auth'

export default async function CreateNewApplicationCard() {
  const user = await getAuthenticatedUser()

  if (!user || !user.id) {
    return null
  }

  const templates = await fetchTemplatesByUserId(user.id)

  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-n-600 p-[8px] text-[16px] text-n-700">
          <IoNewspaperOutline className="h-[26px] w-[26px]" />
          <span>Create a new application</span>
          <CreateNewApplicationModal templates={templates} />
        </div>
      </ModalTrigger>
    </ModalProvider>
  )
}
