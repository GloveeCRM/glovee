import { fetchTemplatesByOrgId } from '@/lib/data/template'
import { fetchOrganizationByOrgName } from '@/lib/data/organization'
import CreateNewTemplateCard from './create-new-template-card'
import TemplateCard from './template-card'

interface TemplateCardWrapperProps {
  orgName: string
}

export default async function TemplateCardWrapper({ orgName }: TemplateCardWrapperProps) {
  // TODO: Change this to be ORG ID
  // const templates = await fetchTemplatesByUserId(user.id)

  const org = await fetchOrganizationByOrgName(orgName)
  if (!org) return null
  const templates = await fetchTemplatesByOrgId(org.id)

  return (
    <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CreateNewTemplateCard orgName={orgName} />
      {templates?.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title}
          description={template.description ?? undefined}
        />
      ))}
    </div>
  )
}
