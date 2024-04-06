import { FiPlus } from 'react-icons/fi'

import { TemplateQuestionSetType as TemplateQuestionSetTypes } from '@prisma/client'
import { TemplateQuestionSetType } from '@/lib/types/template'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'

interface LoopQuestionSetEditProps {
  questionSetId: string
  questionSets: TemplateQuestionSetType[]
  selected: boolean
}

export default function LoopQuestionSetEdit({
  questionSetId,
  questionSets,
  selected,
}: LoopQuestionSetEditProps) {
  return (
    <div
      className={`rounded bg-r-500 ${selected ? 'border-[3px] border-r-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      {questionSets && questionSets.length > 0 ? (
        <div>Question Sets</div>
      ) : (
        <EmptyQuestionSetDropzone
          questionSetId={questionSetId}
          questionSetType={TemplateQuestionSetTypes.LOOP}
        />
      )}
      <LoopQuestionSetEditFooter />
    </div>
  )
}

function LoopQuestionSetEditFooter() {
  return (
    <div className="mx-auto mt-[6px] flex w-fit items-center text-[14px] font-medium">
      <FiPlus className="h-[18px] w-[18px]" />
      <span>Add another one</span>
    </div>
  )
}
