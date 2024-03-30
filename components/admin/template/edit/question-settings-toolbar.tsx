import useQuestionActions from '@/hooks/template/use-question-actions'

interface QuestionSettingsToolbarProps {
  questionId: string
}

export default function QuestionSettingsToolbar({ questionId }: QuestionSettingsToolbarProps) {
  const { getQuestionById } = useQuestionActions()

  const question = getQuestionById(questionId)

  return (
    <div>
      <div>Question Settings</div>
      {question &&
        Object.entries(question).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
    </div>
  )
}
