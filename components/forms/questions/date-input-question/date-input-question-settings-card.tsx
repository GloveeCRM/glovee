import { DateInputQuestionType } from '@/lib/types/qusetion'

interface DateInputQuestionSettingsCardProps {
  question: DateInputQuestionType
}

export default function DateInputQuestionSettingsCard({
  question,
}: DateInputQuestionSettingsCardProps) {
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
