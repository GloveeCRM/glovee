import { FormQuestionModes, FormQuestionSetType, FormQuestionType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import FormQuestion from '@/components/forms/questions/form-question'
import FormQuestionSet from '@/components/forms/question-sets/form-question-set'
import { Separator } from '@/components/ui/separator'

interface ConditionalQuestionSetProps {
  formQuestionSet: FormQuestionSetType
}

export default function ConditionalQuestionSet({ formQuestionSet }: ConditionalQuestionSetProps) {
  const { formQuestionSetQuestions, formQuestionSetChildFormQuestionSets, mode } = useFormContext()
  const questionSetQuestions = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)
  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)

  const question = questionSetQuestions?.[0] as FormQuestionType

  const questionSetsToDisplay = childQuestionSets?.filter(
    (qs) => qs.dependsOnOptionID === question.answer?.answerOptions?.[0]?.formQuestionOptionID
  )

  const isAnswerOnly = mode === FormQuestionModes.ANSWER_ONLY

  return (
    <div className="flex flex-col gap-[12px]">
      <FormQuestion key={question?.formQuestionID} question={question} mode={mode} />
      {questionSetsToDisplay && questionSetsToDisplay.length > 0 && (
        <>
          {!isAnswerOnly && <Separator className="bg-n-400" />}
          <div className="flex flex-col gap-[16px]">
            {questionSetsToDisplay.map((qs) => (
              <FormQuestionSet key={qs.formQuestionSetID} formQuestionSet={qs} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
