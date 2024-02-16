import { fetchQuestionSetsBySectionId } from '@/lib/data/application'
import { ReactNode } from 'react'

export default async function ClientApplicationPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const questionSet = await fetchQuestionSetsBySectionId(sectionId)
  console.log(sectionId)
  console.log(questionSet)

  return <div>{JSON.stringify(questionSet)}</div>
}
