import { TemplateQuestionSetType } from '@/lib/types/template'

interface FlatQuestionSetSettingsCardProps {
  questionSet: TemplateQuestionSetType
}

export default function FlatQuestionSetSettingsCard({
  questionSet,
}: FlatQuestionSetSettingsCardProps) {
  return (
    <div>
      {Object.entries(questionSet).map(([key, value]) => (
        <div key={key}>
          {key}: {JSON.stringify(value)}
        </div>
      ))}
    </div>
  )
}
