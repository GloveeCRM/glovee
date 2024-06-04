import { motion } from 'framer-motion'

import useQuestionActions from '@/hooks/template/use-question-actions'

interface QuestionSettingsToolbarProps {
  questionID: number
}

export default function QuestionSettingsToolbar({ questionID }: QuestionSettingsToolbarProps) {
  const { getTemplateQuestionByID } = useQuestionActions()

  const question = getTemplateQuestionByID(questionID)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
      <div>Question Settings</div>
      {question &&
        Object.entries(question).map(([key, value]) => (
          <div key={key}>
            {key}: {JSON.stringify(value)}
          </div>
        ))}
    </motion.div>
  )
}
