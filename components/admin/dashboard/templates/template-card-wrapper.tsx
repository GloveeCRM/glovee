import { getAuthenticatedUser } from '@/auth'
import { fetchTemplatesByUserId } from '@/lib/data/template'
import CreateNewTemplateCard from './create-new-template-card'
import TemplateCard from './template-card'

export default async function TemplateCardWrapper() {
  const user = await getAuthenticatedUser()
  if (!user || !user.id) return null
  // TODO: Change this to be ORG ID
  const templates = await fetchTemplatesByUserId(user.id)

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
