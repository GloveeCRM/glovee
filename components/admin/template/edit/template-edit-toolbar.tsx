import FlatQuestionSetIcon from '@/components/forms/question-set-type/flat/flat-question-set-icon'
import SaveTemplateButton from './save-template-button'
import DependsOnQuestionSetIcon from '@/components/forms/question-set-type/depends-on/depends-on-question-set-icon'
import LoopQuestionSetIcon from '@/components/forms/question-set-type/loop/loop-question-set-icon'

export default function TemplateEditToolbar() {
  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-n-700 p-[8px] text-n-100">
      <SaveTemplateButton />
      <div className="mt-[14px]">
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
        </div>
      </div>
    </div>
  )
}
