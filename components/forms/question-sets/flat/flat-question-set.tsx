'use client'

import { FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import FormQuestion from '@/components/forms/questions/form-question'

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
  const { formQuestionSetQuestions } = useFormContext()
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
