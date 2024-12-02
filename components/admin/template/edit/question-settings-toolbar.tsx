import { motion } from 'framer-motion'

import {
  isCheckboxQuestionType,
  isDateQuestionType,
  isFileQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import TextQuestionSettings from '@/components/forms/questions/text-question/text-question-settings'
import TextareaQuestionSettings from '@/components/forms/questions/textarea-question/textarea-question-settings'
import SelectQuestionSettings from '@/components/forms/questions/select-question/select-question-settings'
import RadioQuestionSettings from '@/components/forms/questions/radio-question/radio-question-settings'
import CheckboxQuestionSettings from '@/components/forms/questions/checkbox-question/checkbox-question-settings'
import FileQuestionSettings from '@/components/forms/questions/file-question/file-question-settings'
import DateQuestionSettings from '@/components/forms/questions/date-question/date-question-settings'

interface QuestionSettingsToolbarProps {
  formQuestionID: number
}

export default function QuestionSettingsToolbar({ formQuestionID }: QuestionSettingsToolbarProps) {
  const { selectedFormQuestion } = useFormTemplateEditContext()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
      className="py-[6px] text-[14px]"
    >
      <div className="mb-[12px]">Question Settings</div>
      {selectedFormQuestion && (
        <div>
          {isTextQuestionType(selectedFormQuestion) ? (
            <TextQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isTextareaQuestionType(selectedFormQuestion) ? (
            <TextareaQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isSelectQuestionType(selectedFormQuestion) ? (
            <SelectQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isDateQuestionType(selectedFormQuestion) ? (
            <DateQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isRadioQuestionType(selectedFormQuestion) ? (
            <RadioQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isCheckboxQuestionType(selectedFormQuestion) ? (
            <CheckboxQuestionSettings formQuestion={selectedFormQuestion} />
          ) : isFileQuestionType(selectedFormQuestion) ? (
            <FileQuestionSettings formQuestion={selectedFormQuestion} />
          ) : (
            <div>Settings for this question type are not available</div>
          )}
        </div>
      )}
    </motion.div>
  )
}
