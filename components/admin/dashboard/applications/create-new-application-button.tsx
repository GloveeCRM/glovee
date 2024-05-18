import { GoPlus } from 'react-icons/go'

import { UserType } from '@/lib/types/user'
import { fetchTemplatesByOrgId } from '@/lib/data/template'
import { fetchOrganizationProfile } from '@/lib/data/organization'
import CreateNewApplicationModal from './create-new-application-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'

interface CreateNewApplicationButtonProp {
  orgName: string
  client?: UserType
}

export default async function CreateNewApplicationButton({
  orgName,
  client,
}: CreateNewApplicationButtonProp) {
  const org = await fetchOrganizationProfile(orgName)
  if (!org) return null

  const templates = await fetchTemplatesByOrgId(org.id)
  if (!templates) return null

  return (
    <ModalProvider>
      <ModalTrigger>
        <div className="flex cursor-pointer items-center gap-[4px] rounded border border-n-700 py-[5px] pl-[8px] pr-[10px]">
          <GoPlus className="h-[20px] w-[20px]" />
          <span>New Application</span>
          <CreateNewApplicationModal templates={templates} orgName={orgName} client={client} />
        </div>
      </ModalTrigger>
    </ModalProvider>
  )
}
