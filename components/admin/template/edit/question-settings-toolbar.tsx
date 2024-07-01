import { motion } from 'framer-motion'

import useQuestionActions from '@/hooks/template/use-question-actions'
import {
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextInputQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/qusetion'
import TextInputQuestionSettings from '@/components/forms/questions/text-input-question/text-input-question-settings'
import TextareaQuestionSettings from '@/components/forms/questions/textarea-question/textarea-question-settings'
import SelectQuestionSettings from '@/components/forms/questions/select-question/select-question-settings'
import RadioQuestionSettings from '@/components/forms/questions/radio-question/radio-question-settings'
import CheckboxQuestionSettings from '@/components/forms/questions/checkbox-question/checkbox-question-settings'
import DocumentQuestionSettings from '@/components/forms/questions/document-question/document-question-settings'

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
      {question && (
        <div>
          {isTextInputQuestionType(question) ? (
            <TextInputQuestionSettings question={question} />
          ) : isTextareaQuestionType(question) ? (
            <TextareaQuestionSettings question={question} />
          ) : isSelectQuestionType(question) ? (
            <SelectQuestionSettings question={question} />
          ) : isDateInputQuestionType(question) ? (
            <div>Date Input Settings</div>
          ) : isRadioQuestionType(question) ? (
            <RadioQuestionSettings question={question} />
          ) : isCheckboxQuestionType(question) ? (
            <CheckboxQuestionSettings question={question} />
          ) : isDocumentQuestionType(question) ? (
            <DocumentQuestionSettings question={question} />
          ) : (
            <div>Settings for this question type are not available</div>
          )}
        </div>
      )}
    </motion.div>
  )
}
