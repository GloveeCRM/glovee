import { TemplateQuestionSetType } from '@/lib/types/template'

interface LoopQuestionSetSettingsCardProps {
  questionSet: TemplateQuestionSetType
}

export default function LoopQuestionSetSettingsCard({
  questionSet,
}: LoopQuestionSetSettingsCardProps) {
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
