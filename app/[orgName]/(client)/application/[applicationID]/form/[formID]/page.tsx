import { FormQuestionSetType } from '@/lib/types/form'
import { fetchFormQuestionSets } from '@/lib/data/form'
import { getSessionPayload } from '@/lib/auth/session'
import FormQuestionSet from '@/components/forms/question-sets/form-question-set'
import { nestQuestionSets } from '@/lib/utils/form'

export default async function ClientApplicationPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0
  const sectionID = parseInt(searchParams.section || '0')
  const questionSets = await fetchFormQuestionSets({
    filters: {
      userID: clientID,
      sectionID: sectionID,
      includeQuestions: true,
      includeAnswers: true,
    },
  })
  const nestedQuestionSets = nestQuestionSets(questionSets)

  return <QuestionSetWrapper questionSets={nestedQuestionSets} />
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
            key={questionSet.formQuestionSetID}
            className="flex w-full flex-col gap-[8px] rounded-lg border border-n-400 p-[8px]"
          >
            <FormQuestionSet key={questionSet.formQuestionSetID} questionSet={questionSet} />
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}
