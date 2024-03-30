import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface QuestionSetSettingsToolbarProps {
  questionSetId: string
}

export default function QuestionSetSettingsToolbar({
  questionSetId,
}: QuestionSetSettingsToolbarProps) {
  const { getQuestionSetById } = useQuestionSetActions()

  const questionSet = getQuestionSetById(questionSetId)

  return (
    <div>
      <div>Question Set Settings</div>
      {questionSet &&
        Object.entries(questionSet).map(([key, value]) => (
          <div key={key}>
            {key}: {JSON.stringify(value)}
          </div>
        ))}
    </div>
  )
}
