interface QuestionSettingsToolbarProps {
  questionId: string
}

export default function QuestionSettingsToolbar({ questionId }: QuestionSettingsToolbarProps) {
  return (
    <div>
      <div>Question Settings</div>
      <div>questionId: {questionId}</div>
    </div>
  )
}
