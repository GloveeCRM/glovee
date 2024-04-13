import { TemplateQuestionSetType } from '@/lib/types/template'

interface DependsOnQuestionSetSettingsCardProps {
  questionSet: TemplateQuestionSetType
}

export default function DependsOnQuestionSetSettingsCard({
  questionSet,
}: DependsOnQuestionSetSettingsCardProps) {
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
