import { FormQuestionSetType } from '@/lib/types/form'
import { fetchSectionQuestionSets } from '@/lib/data/form'
import { getSessionPayload } from '@/lib/auth/session'
import FormQuestionSet from '@/components/forms/question-sets/form-question-set'

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

  return <QuestionSetWrapper questionSets={questionSets} />
}

interface QuestionSetWrapperProps {
  questionSets: FormQuestionSetType[]
}

function QuestionSetWrapper({ questionSets }: QuestionSetWrapperProps) {
  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll p-[12px]">
      {questionSets ? (
        questionSets.map((questionSet) => (
          <div
            key={questionSet.id}
            className="flex w-full flex-col gap-[8px] rounded-lg border border-n-400 p-[8px]"
          >
            <FormQuestionSet key={questionSet.id} questionSet={questionSet} />
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}
