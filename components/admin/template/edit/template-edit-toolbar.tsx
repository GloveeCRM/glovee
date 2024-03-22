import FlatQuestionSetIcon from '@/components/forms/question-set-types/flat/flat-question-set-icon'
import SaveTemplateButton from './save-template-button'
import DependsOnQuestionSetIcon from '@/components/forms/question-set-types/depends-on/depends-on-question-set-icon'
import LoopQuestionSetIcon from '@/components/forms/question-set-types/loop/loop-question-set-icon'
import CheckboxIcon from '@/components/forms/input-types/checkbox/checkbox-icon'
import TextInputIcon from '@/components/forms/input-types/text-input/text-input-icon'
import TextareaIcon from '@/components/forms/input-types/textarea/textarea-icon'
import SelectIcon from '@/components/forms/input-types/select/select-icon'
import DateInputIcon from '@/components/forms/input-types/date-input/date-input-icon'
import RadioIcon from '@/components/forms/input-types/radio/radio-icon'
import DocumentIcon from '@/components/forms/input-types/document/document-icon'

export default function TemplateEditToolbar() {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-n-700 p-[8px] text-n-100">
      <SaveTemplateButton />
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
            <TextInputIcon />
            <TextareaIcon />
            <SelectIcon />
            <DateInputIcon />
            <RadioIcon />
            <CheckboxIcon />
            <DocumentIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
