import { motion } from 'framer-motion'

import FlatQuestionSetIcon from '@/components/forms/question-sets/flat/flat-question-set-icon'
import DependsOnQuestionSetIcon from '@/components/forms/question-sets/depends-on/depends-on-question-set-icon'
import LoopQuestionSetIcon from '@/components/forms/question-sets/loop/loop-question-set-icon'
import CheckboxQuestionIcon from '@/components/forms/questions/checkbox-question/checkbox-question-icon'
import TextInputQuestionIcon from '@/components/forms/questions/text-input-question/text-input-question-icon'
import TextareaQuestionIcon from '@/components/forms/questions/textarea-question/textarea-question-icon'
import SelectQuestionIcon from '@/components/forms/questions/select-question/select-question-icon'
import DateInputQuestionIcon from '@/components/forms/questions/date-input-question/date-input-question-icon'
import RadioQuestionIcon from '@/components/forms/questions/radio-question/radio-question-icon'
import FileQuestionIcon from '@/components/forms/questions/file-question/file-question-icon'

export default function TemplateEditDefaultToolbar() {
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
          <FlatQuestionSetIcon />
          <DependsOnQuestionSetIcon />
          <LoopQuestionSetIcon />
        </div>
      </div>
      <div className="mt-[10px]">
        <h6 className="text-[14px]">Input Types</h6>
        <div className="mt-[8px] flex flex-col gap-[6px]">
          <TextInputQuestionIcon />
          <TextareaQuestionIcon />
          <SelectQuestionIcon />
          <DateInputQuestionIcon />
          <RadioQuestionIcon />
          <CheckboxQuestionIcon />
          <FileQuestionIcon />
        </div>
      </div>
    </motion.div>
  )
}
