'use client'

import { FormQuestionSetType, isRadioQuestionType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import RadioQuestionSettings from '../../questions/radio-question/radio-question-settings'

interface DependsOnQuestionSetSettingsProps {
  formQuestionSet: FormQuestionSetType
}

export default function DependsOnQuestionSetSettings({
  formQuestionSet,
}: DependsOnQuestionSetSettingsProps) {
  const { formQuestionSetQuestions } = useFormTemplateEditContext()

  const formQuestionSetQuestion = formQuestionSetQuestions(formQuestionSet.formQuestionSetID)?.[0]

  return (
    <div className="">
      {formQuestionSetQuestion && isRadioQuestionType(formQuestionSetQuestion) && (
        <RadioQuestionSettings formQuestion={formQuestionSetQuestion} />
      )}
    </div>
  )
}
