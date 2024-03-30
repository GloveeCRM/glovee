interface QuestionSetSettingsToolbarProps {
  questionSetId: string
}

export default function QuestionSetSettingsToolbar({
  questionSetId,
}: QuestionSetSettingsToolbarProps) {
  return (
    <div>
      <div>Question Set Settings</div>
      <div>questionSetId: {questionSetId}</div>
    </div>
  )
}
