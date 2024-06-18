'use client'

import { Switch } from '@/components/ui/switch'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { TextInputQuestionType } from '@/lib/types/qusetion'

interface TextInputQuestionSettingsProps {
  question: TextInputQuestionType
}

export default function TextInputQuestionSettings({ question }: TextInputQuestionSettingsProps) {
  const { updateQuestion } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      settings: { ...question.settings, isRequired: isChecked },
    })
  }

  return (
    <div>
      <div className="flex gap-[6px]">
        <div>isRequired</div>
        <div>{String(question.settings.isRequired)}</div>
        <Switch checked={question.settings.isRequired} onCheckedChange={handleChangeIsRequired} />
      </div>
      <div className="flex gap-[6px]">
        <div>Placeholder</div>
        <div>{question.settings.placeholder}</div>
      </div>
      <div className="flex gap-[6px]">
        <div>Helper Text</div>
        <div>{question.helperText}</div>
      </div>
    </div>
  )
}
