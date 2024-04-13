import { motion } from 'framer-motion'

import {
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextInputQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/qusetion'
import useQuestionActions from '@/hooks/template/use-question-actions'
import TextInputQuestionSettingsCard from '@/components/forms/questions/text-input-question/text-input-question-settings-card'
import SelectQuestionSettingsCard from '@/components/forms/questions/select-question/select-question-settings-card'
import TextareaQuestionSettingsCard from '@/components/forms/questions/textarea-question/textarea-question-settings-card'
import DateInputQuestionSettingsCard from '@/components/forms/questions/date-input-question/date-input-question-settings-card'
import RadioQuestionSettingsCard from '@/components/forms/questions/radio-question/radio-question-settings-card'
import CheckboxQuestionSettingsCard from '@/components/forms/questions/checkbox-question/checkbox-question-settings'
import DocumentQuestionSettingsCard from '@/components/forms/questions/document-question/document-question-settings'

interface QuestionSettingsToolbarProps {
  questionId: string
}

export default function QuestionSettingsToolbar({ questionId }: QuestionSettingsToolbarProps) {
  const { getQuestionById } = useQuestionActions()

  const question = getQuestionById(questionId)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
      <div>Question Settings</div>
      {question &&
        (isTextInputQuestionType(question) ? (
          <TextInputQuestionSettingsCard question={question} />
        ) : isTextareaQuestionType(question) ? (
          <TextareaQuestionSettingsCard question={question} />
        ) : isSelectQuestionType(question) ? (
          <SelectQuestionSettingsCard question={question} />
        ) : isDateInputQuestionType(question) ? (
          <DateInputQuestionSettingsCard question={question} />
        ) : isRadioQuestionType(question) ? (
          <RadioQuestionSettingsCard question={question} />
        ) : isCheckboxQuestionType(question) ? (
          <CheckboxQuestionSettingsCard question={question} />
        ) : isDocumentQuestionType(question) ? (
          <DocumentQuestionSettingsCard question={question} />
        ) : null)}
    </motion.div>
  )
}
