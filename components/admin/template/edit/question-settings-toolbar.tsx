import { motion } from 'framer-motion'

import useQuestionActions from '@/hooks/template/use-question-actions'
import { TemplateQuestionType } from '@prisma/client'
import TextInputQuestionSettingsCard from '@/components/forms/questions/text-input-question/text-input-question-settings-card'
import SelectQuestionSettingsCard from '@/components/forms/questions/select-question/select-question-settings-card'
import TextareaQuestionSettingsCard from '@/components/forms/questions/textarea-question/textarea-question-settings-card'
import DateInputQuestionSettingsCard from '@/components/forms/questions/date-input-question/date-input-question-settings-card'

interface QuestionSettingsToolbarProps {
  questionId: string
}

export default function QuestionSettingsToolbar({ questionId }: QuestionSettingsToolbarProps) {
  const { getQuestionById } = useQuestionActions()

  const question = getQuestionById(questionId)

  const isTextInput = question?.type === TemplateQuestionType.TEXT_INPUT
  const isTextarea = question?.type === TemplateQuestionType.TEXTAREA
  const isSelect = question?.type === TemplateQuestionType.SELECT
  const isDate = question?.type === TemplateQuestionType.DATE_INPUT
  const isRadio = question?.type === TemplateQuestionType.RADIO
  const isCheckbox = question?.type === TemplateQuestionType.CHECKBOX
  const isDocument = question?.type === TemplateQuestionType.DOCUMENT

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
      <div>Question Settings</div>
      {isTextInput ? (
        <TextInputQuestionSettingsCard question={question} />
      ) : isTextarea ? (
        <TextareaQuestionSettingsCard question={question} />
      ) : isSelect ? (
        <SelectQuestionSettingsCard question={question} />
      ) : isDate ? (
        <DateInputQuestionSettingsCard question={question} />
      ) : isRadio ? (
        <div>Radio</div>
      ) : isCheckbox ? (
        <div>Checkbox</div>
      ) : isDocument ? (
        <div>Document</div>
      ) : null}
    </motion.div>
  )
}
