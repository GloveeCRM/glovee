import { FiPlus } from 'react-icons/fi'

import { TemplateQuestionSetType } from '@/lib/types/template'
import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'

interface LoopQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
  selected: boolean
}

export default function LoopQuestionSetEdit({ questionSet, selected }: LoopQuestionSetEditProps) {
  const questionSets = questionSet.questionSets

  return (
    <div
      className={`rounded bg-r-500 ${selected ? 'border-[3px] border-r-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      {questionSets && questionSets.length > 0 ? (
        <div className="bg-r-200 px-[4px]">
          {questionSets.map((qs) => (
            <div key={qs.id}>
              {qs.position === 0 && (
                <NonEmptyQuestionSetDropzone position={0} questionSet={questionSet} />
              )}
              <TemplateQuestionSet key={qs.id} questionSet={qs} />
              <NonEmptyQuestionSetDropzone
                position={questionSet.position + 1}
                questionSet={questionSet}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyQuestionSetDropzone questionSet={questionSet} />
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
