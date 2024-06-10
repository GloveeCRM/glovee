import ApplicationQuestionSet from '@/components/forms/question-sets/application-question-set'
import { getSessionPayload } from '@/lib/auth/session'
import { fetchSectionQuestionSets } from '@/lib/data/application'

export default async function ClientApplicationPage({
  params,
  searchParams,
}: {
  params: { orgName: string }
  searchParams: { section?: string }
}) {
  const orgName = params.orgName
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0
  const sectionId = parseInt(searchParams.section || '0')
  const questionSets = await fetchSectionQuestionSets(orgName, clientID, sectionId)

  return (
    <div>
      {questionSets.map((questionSet) => (
        <ApplicationQuestionSet key={questionSet.id} questionSet={questionSet} />
      ))}
    </div>
  )
}
