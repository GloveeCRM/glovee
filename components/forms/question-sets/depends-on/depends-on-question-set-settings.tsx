'use client'

import { FormQuestionSetType, isRadioQuestionType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import RadioQuestionSettings from '../../questions/radio-question/radio-question-settings'

interface DependsOnQuestionSetSettingsProps {
  formQuestionSet: FormQuestionSetType
}

export default function DependsOnQuestionSetSettings({
  formQuestionSet,
}: DependsOnQuestionSetSettingsProps) {
  const { formQuestionSetQuestions } = useFormContext()

  const formQuestionSetQuestion = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)?.[0]

  return (
    <div className="">
      {formQuestionSetQuestion && isRadioQuestionType(formQuestionSetQuestion) && (
        <RadioQuestionSettings formQuestion={formQuestionSetQuestion} />
      )}
    </div>
  )
}
