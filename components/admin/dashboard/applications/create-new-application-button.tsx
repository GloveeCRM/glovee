import { GoPlus } from 'react-icons/go'

import { fetchTemplatesByOrgId } from '@/lib/data/template'
import CreateNewApplicationModal from './create-new-application-modal'
import { ModalProvider, ModalTrigger } from '../../../ui/modal'
import { fetchCurrentOrgId } from '@/lib/utils/server'

interface CreateNewApplicationButtonProp {
  orgName: string
}

export default async function CreateNewApplicationButton({
  orgName,
}: CreateNewApplicationButtonProp) {
  const orgId = await fetchCurrentOrgId()
  if (!orgId) return null

  const templates = await fetchTemplatesByOrgId(orgId)
  if (!templates) return null

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
