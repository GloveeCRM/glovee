import { fetchQuestionSetsBySectionId } from '@/lib/data/application'
import { ReactNode } from 'react'

export default async function ClientApplicationPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sectionId = searchParams.section as string
  const questionSet = await fetchQuestionSetsBySectionId(sectionId)

  return <div>{JSON.stringify(questionSet)}</div>
}
