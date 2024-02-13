import { fetchTemplateById } from '@/lib/data/template'
import { notFound } from 'next/navigation'

export default async function EditPage({ params }: { params: { id: string } }) {
  const id = params.id
  const template = (await fetchTemplateById(id)) as any

  if (!template) {
    notFound()
  }

  return (
    <div>
      <p>{template.title}</p>
      <p>{template.description}</p>
    </div>
  )
}
