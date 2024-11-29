import { motion } from 'framer-motion'

import {
  FormQuestionSetType,
  isStaticQuestionSetType,
  isRepeatableQuestionSetType,
  isConditionalQuestionSetType,
} from '@/lib/types/form'

import DependsOnQuestionSetSettings from '@/components/forms/question-sets/depends-on/depends-on-question-set-settings'

interface QuestionSetSettingsToolbarProps {
  formQuestionSet: FormQuestionSetType
}

export default function QuestionSetSettingsToolbar({
  formQuestionSet,
}: QuestionSetSettingsToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
      className="py-[6px] text-[14px]"
    >
      <div className="mb-[12px]">Question Set Settings</div>
      {formQuestionSet && (
        <div className="flex flex-col gap-[10px]">
          {isStaticQuestionSetType(formQuestionSet) ? (
            <div>Questions: {formQuestionSet.questions?.length}</div>
          ) : isRepeatableQuestionSetType(formQuestionSet) ? (
            <div>loop</div>
          ) : isConditionalQuestionSetType(formQuestionSet) ? (
            <DependsOnQuestionSetSettings formQuestionSet={formQuestionSet} />
          ) : (
            <div>Settings for this question set type are not available</div>
          )}
        </div>
      )}
    </motion.div>
  )
}
