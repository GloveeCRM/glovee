import { fetchTemplatesByOrgId } from '@/lib/data/template'
import CreateNewTemplateCard from './create-new-template-card'
import TemplateCard from './template-card'
import { fetchCurrentOrgId } from '@/lib/utils/server'

export default async function TemplateCardWrapper() {
  // TODO: Change this to be ORG ID
  // const templates = await fetchTemplatesByUserId(user.id)

  const orgId = await fetchCurrentOrgId()
  if (!orgId) return null
  const templates = await fetchTemplatesByOrgId(orgId)

  return (
    <div className="grid grid-cols-1 gap-[8px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CreateNewTemplateCard />
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
