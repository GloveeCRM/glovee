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
      <div>questionSetId: {questionSetId}</div>
      <div>questionSetType: {questionSet?.type}</div>
    </div>
  )
}
