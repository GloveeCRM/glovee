import { FormQuestionSetType } from '@/lib/types/form'
import { RadioQuestionType } from '@/lib/types/qusetion'
import FormQuestion from '../../questions/form-question'
import FormQuestionSet from '../form-question-set'
import { Separator } from '@/components/ui/separator'

interface DependsOnQuestionSetProps {
  formQuestionSet: FormQuestionSetType
  viewOnly?: boolean
}

export default function DependsOnQuestionSet({
  formQuestionSet,
  viewOnly = false,
}: DependsOnQuestionSetProps) {
  const question = formQuestionSet.formQuestionSetQuestions?.[0] as RadioQuestionType

  const questionSets = formQuestionSet.formQuestionSetQuestions
  const questionSetsToDisplay = questionSets?.filter(
    (qs) => qs.dependsOn === question.answer?.optionIDs?.[0]
  )

  return (
    <div className="flex flex-col gap-[12px]">
      <FormQuestion key={question?.id} question={question} viewOnly={viewOnly} />
      {questionSetsToDisplay && questionSetsToDisplay.length > 0 && (
        <>
          <Separator className="bg-n-400" />
          <div className="flex flex-col gap-[16px]">
            {questionSetsToDisplay.map((qs) => (
              <FormQuestionSet key={qs.id} questionSet={qs} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
