'use client'

import { FormQuestionSetType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import FormQuestion from '../../questions/form-question'

interface FlatQuestionSetProps {
  formQuestionSet: FormQuestionSetType
  viewOnly?: boolean
  mode: 'edit' | 'view'
}

export default function FlatQuestionSet({
  formQuestionSet,
  viewOnly = false,
  mode,
}: FlatQuestionSetProps) {
  const { formQuestionSetQuestions } = useApplicationFormContext()
  const questionSetQuestions = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)

  return (
    <div className="flex flex-col gap-[12px]">
      {questionSetQuestions &&
        questionSetQuestions.length > 0 &&
        questionSetQuestions.map((q) => (
          <FormQuestion key={q.formQuestionID} question={q} viewOnly={viewOnly} mode={mode} />
        ))}
    </div>
  )
}
