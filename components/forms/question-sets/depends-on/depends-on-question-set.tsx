import { FormQuestionSetType, FormQuestionType } from '@/lib/types/form'
import { RadioQuestionType } from '@/lib/types/qusetion'
import FormQuestion from '../../questions/form-question'
import FormQuestionSet from '../form-question-set'
import { Separator } from '@/components/ui/separator'
import { useApplicationFormContext } from '@/contexts/application-form-context'

interface DependsOnQuestionSetProps {
  formQuestionSet: FormQuestionSetType
  viewOnly?: boolean
  mode: 'edit' | 'view'
}

export default function DependsOnQuestionSet({
  formQuestionSet,
  viewOnly = false,
  mode,
}: DependsOnQuestionSetProps) {
  const { formQuestionSetQuestions, formQuestionSetChildFormQuestionSets } =
    useApplicationFormContext()
  const questionSetQuestions = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)
  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)

  const question = questionSetQuestions?.[0] as FormQuestionType

  const questionSetsToDisplay = childQuestionSets?.filter(
    (qs) => qs.dependsOnOptionID === question.answer?.answerOptions?.[0]?.formQuestionOptionID
  )

  return (
    <div className="flex flex-col gap-[12px]">
      <FormQuestion
        key={question?.formQuestionID}
        question={question}
        viewOnly={viewOnly}
        mode={mode}
      />
      {questionSetsToDisplay && questionSetsToDisplay.length > 0 && (
        <>
          {mode === 'edit' && <Separator className="bg-n-400" />}
          <div className="flex flex-col gap-[16px]">
            {questionSetsToDisplay.map((qs) => (
              <FormQuestionSet key={qs.formQuestionSetID} formQuestionSet={qs} mode={mode} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
