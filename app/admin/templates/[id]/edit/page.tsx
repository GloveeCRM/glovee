import { fetchTemplateById } from '@/lib/data/template'
import { notFound } from 'next/navigation'

export default function EditPage({ params }: { params: { id: string } }) {
  const id = +params.id
  const template = fetchTemplateById(id)

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
