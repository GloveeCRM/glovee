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
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll p-[12px]">
      {questionSets ? (
        questionSets.map((questionSet) => (
          <div className="flex w-full flex-col gap-[8px] rounded-lg bg-white px-[8px] py-[12px]">
            <ApplicationQuestionSet key={questionSet.id} questionSet={questionSet} />
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}
