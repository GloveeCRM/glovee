import { TextareaQuestionType } from '@/lib/types/qusetion'

interface TextareaQuestionSettingsCardProps {
  question: TextareaQuestionType
}

export default function TextareaQuestionSettingsCard({
  question,
}: TextareaQuestionSettingsCardProps) {
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
