'use client'

import { FormQuestionSetType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import FormQuestion from '../../questions/form-question'

interface FlatQuestionSetViewProps {
  formQuestionSet: FormQuestionSetType
  viewOnly?: boolean
}

export default function FlatQuestionSetView({
  formQuestionSet,
  viewOnly = false,
}: FlatQuestionSetViewProps) {
  const { formQuestionSetQuestions } = useApplicationFormContext()
  const questionSetQuestions = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)

  return (
    <div className="flex flex-col gap-[12px]">
      {questionSetQuestions &&
        questionSetQuestions.length > 0 &&
        questionSetQuestions.map((q) => (
          <FormQuestion key={q.formQuestionID} question={q} viewOnly={viewOnly} />
        ))}
    </div>
  )
}
