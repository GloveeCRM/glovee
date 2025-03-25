'use client'

import { FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import FormQuestion from '@/components/forms/questions/form-question'

interface StaticQuestionSetProps {
  formQuestionSet: FormQuestionSetType
}

export default function StaticQuestionSet({ formQuestionSet }: StaticQuestionSetProps) {
  const { formQuestionSetQuestions, mode } = useFormContext()
  const questionSetQuestions = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)

  return (
    <div className="flex flex-col gap-[12px]">
      {questionSetQuestions &&
        questionSetQuestions.length > 0 &&
        questionSetQuestions.map((q) => (
          <FormQuestion key={q.formQuestionID} question={q} mode={mode} />
        ))}
    </div>
  )
}
