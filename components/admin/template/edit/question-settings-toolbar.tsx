import { motion } from 'framer-motion'

import useQuestionActions from '@/hooks/template/use-question-actions'
import { isTextInputQuestionType } from '@/lib/types/qusetion'
import TextInputQuestionSettings from '@/components/forms/questions/text-input-question/text-input-question-settings'

interface QuestionSettingsToolbarProps {
  questionID: number
}

export default function QuestionSettingsToolbar({ questionID }: QuestionSettingsToolbarProps) {
  const { getTemplateQuestionByID } = useQuestionActions()

  const question = getTemplateQuestionByID(questionID)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
      className="py-[6px] text-[14px]"
    >
      <div className="mb-[12px]">Question Settings</div>
      {question && isTextInputQuestionType(question) && (
        <TextInputQuestionSettings question={question} />
      )}
    </motion.div>
  )
}
