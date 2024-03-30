import FlatQuestionSetIcon from '@/components/forms/question-set-types/flat/flat-question-set-icon'
import DependsOnQuestionSetIcon from '@/components/forms/question-set-types/depends-on/depends-on-question-set-icon'
import LoopQuestionSetIcon from '@/components/forms/question-set-types/loop/loop-question-set-icon'
import CheckboxQuestionIcon from '@/components/forms/question-input-types/checkbox-question/checkbox-question-icon'
import TextInputQuestionIcon from '@/components/forms/question-input-types/text-input-question/text-input-question-icon'
import TextareaQuestionIcon from '@/components/forms/question-input-types/textarea-question/textarea-question-icon'
import SelectQuestionIcon from '@/components/forms/question-input-types/select-question/select-question-icon'
import DateInputQuestionIcon from '@/components/forms/question-input-types/date-input-question/date-input-question-icon'
import RadioQuestionIcon from '@/components/forms/question-input-types/radio-question/radio-question-icon'
import DocumentQuestionIcon from '@/components/forms/question-input-types/document-question/document-question-icon'

export default function TemplateEditDefaultToolbar() {
  return (
    <div className="mt-[14px] overflow-y-scroll">
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
          <DocumentQuestionIcon />
        </div>
      </div>
    </div>
  )
}
