import { motion } from 'framer-motion'

import StaticQuestionSetIcon from '@/components/forms/question-sets/flat/static-question-set-icon'
import ConditionalQuestionSetIcon from '@/components/forms/question-sets/depends-on/conditional-question-set-icon'
import RepeatableQuestionSetIcon from '@/components/forms/question-sets/repeatable/repeatable-question-set-icon'
import CheckboxQuestionIcon from '@/components/forms/questions/checkbox-question/checkbox-question-icon'
import TextQuestionIcon from '@/components/forms/questions/text-question/text-question-icon'
import TextareaQuestionIcon from '@/components/forms/questions/textarea-question/textarea-question-icon'
import SelectQuestionIcon from '@/components/forms/questions/select-question/select-question-icon'
import DateQuestionIcon from '@/components/forms/questions/date-question/date-question-icon'
import RadioQuestionIcon from '@/components/forms/questions/radio-question/radio-question-icon'
import FileQuestionIcon from '@/components/forms/questions/file-question/file-question-icon'

export default function FormTemplateEditDefaultToolbar() {
  return (
    <motion.div
      className="mt-[14px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.05 }}
    >
      <div>
        <h6 className="text-[14px]">Question Set Types</h6>
        <div className="mt-[8px] flex flex-col gap-[6px]">
          <StaticQuestionSetIcon />
          <ConditionalQuestionSetIcon />
          <RepeatableQuestionSetIcon />
        </div>
      </div>
      <div className="mt-[10px]">
        <h6 className="text-[14px]">Input Types</h6>
        <div className="mt-[8px] flex flex-col gap-[6px]">
          <TextQuestionIcon />
          <TextareaQuestionIcon />
          <SelectQuestionIcon />
          <DateQuestionIcon />
          <RadioQuestionIcon />
          <CheckboxQuestionIcon />
          <FileQuestionIcon />
        </div>
      </div>
    </motion.div>
  )
}
