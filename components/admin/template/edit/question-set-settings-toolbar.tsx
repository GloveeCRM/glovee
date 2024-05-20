import { motion } from 'framer-motion'

import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface QuestionSetSettingsToolbarProps {
  questionSetID: number
}

export default function QuestionSetSettingsToolbar({
  questionSetID,
}: QuestionSetSettingsToolbarProps) {
  const { getQuestionSetById } = useQuestionSetActions()

  const questionSet = getQuestionSetById(questionSetID)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
      <div>Question Set Settings</div>
      {questionSet &&
        Object.entries(questionSet).map(([key, value]) => (
          <div key={key}>
            {key}: {JSON.stringify(value)}
          </div>
        ))}
    </motion.div>
  )
}
