import { CheckboxQuestionType } from '@/lib/types/qusetion'

interface CheckboxQuestionSettingsCardProps {
  question: CheckboxQuestionType
}

export default function CheckboxQuestionSettingsCard({
  question,
}: CheckboxQuestionSettingsCardProps) {
  return (
    <div>
      {Object.entries(question).map(([key, value]) => (
        <div key={key}>
          {key}: {JSON.stringify(value)}
        </div>
      ))}
    </div>
  )
}
