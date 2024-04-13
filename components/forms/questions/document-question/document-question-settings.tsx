import { DocumentQuestionType } from '@/lib/types/qusetion'

interface DocumentQuestionSettingsCardProps {
  question: DocumentQuestionType
}

export default function DocumentQuestionSettingsCard({
  question,
}: DocumentQuestionSettingsCardProps) {
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
