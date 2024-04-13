import { RadioQuestionType } from '@/lib/types/qusetion'

interface RadioQuestionSettingsCardProps {
  question: RadioQuestionType
}

export default function RadioQuestionSettingsCard({ question }: RadioQuestionSettingsCardProps) {
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
