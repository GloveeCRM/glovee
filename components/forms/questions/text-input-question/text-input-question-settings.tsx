import { Switch } from '@/components/ui/switch'
import { TextInputQuestionType } from '@/lib/types/qusetion'

interface TextInputQuestionSettingsProps {
  question: TextInputQuestionType
}

export default function TextInputQuestionSettings({ question }: TextInputQuestionSettingsProps) {
  return (
    <div>
      <div className="flex gap-[6px]">
        <div>isRequired</div>
        <div>{String(question.settings.isRequired)}</div>
        <Switch checked={question.settings.isRequired} />
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
