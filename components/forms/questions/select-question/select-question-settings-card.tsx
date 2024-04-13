import { SelectQuestionType } from '@/lib/types/qusetion'

interface SelectQuestionSettingsCardProps {
  question: SelectQuestionType
}

export default function SelectQuestionSettingsCard({ question }: SelectQuestionSettingsCardProps) {
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
