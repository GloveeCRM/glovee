import { TextInputQuestionType } from '@/lib/types/qusetion'

interface TextInputQuestionSettingsCardProps {
  question: TextInputQuestionType
}

export default function TextInputQuestionSettingsCard({
  question,
}: TextInputQuestionSettingsCardProps) {
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
