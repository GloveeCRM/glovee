import { motion } from 'framer-motion'

import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import {
  isDependsOnQuestionSetType,
  isFlatQuestionSetType,
  isLoopQuestionSetType,
} from '@/lib/types/application'
import DependsOnQuestionSetSettings from '@/components/forms/question-sets/depends-on/depends-on-question-set-settings'

interface QuestionSetSettingsToolbarProps {
  questionSetID: number
}

export default function QuestionSetSettingsToolbar({
  questionSetID,
}: QuestionSetSettingsToolbarProps) {
  const { getQuestionSetById } = useQuestionSetActions()

  const questionSet = getQuestionSetById(questionSetID)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
      className="py-[6px] text-[14px]"
    >
      <div className="mb-[12px]">Question Set Settings</div>
      {questionSet && (
        <div className="flex flex-col gap-[10px]">
          {isFlatQuestionSetType(questionSet) ? (
            <div>Questions: {questionSet.questions?.length}</div>
          ) : isLoopQuestionSetType(questionSet) ? (
            <div>loop</div>
          ) : isDependsOnQuestionSetType(questionSet) ? (
            <DependsOnQuestionSetSettings questionSet={questionSet} />
          ) : (
            <div>Settings for this question set type are not available</div>
          )}
        </div>
      )}
    </motion.div>
  )
}
