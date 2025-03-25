'use client'

import { FormQuestionSetType, isRadioQuestionType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import RadioQuestionSettings from '@/components/forms/questions/radio-question/radio-question-settings'

interface ConditionalQuestionSetSettingsProps {
  formQuestionSet: FormQuestionSetType
}

export default function ConditionalQuestionSetSettings({
  formQuestionSet,
}: ConditionalQuestionSetSettingsProps) {
  const { formQuestionSetQuestions } = useFormContext()

  const formQuestionSetQuestion = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)?.[0]

  return (
    <>
      {formQuestionSetQuestion && isRadioQuestionType(formQuestionSetQuestion) && (
        <RadioQuestionSettings formQuestion={formQuestionSetQuestion} />
      )}
    </>
  )
}
