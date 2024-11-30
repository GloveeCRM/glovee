import { FiPlus } from 'react-icons/fi'

import { FormQuestionSetType } from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'

interface LoopQuestionSetEditProps {
  formQuestionSet: FormQuestionSetType
}

export default function LoopQuestionSetEdit({ formQuestionSet }: LoopQuestionSetEditProps) {
  const { formQuestionSetChildFormQuestionSets } = useFormTemplateEditContext()
  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)

  return (
    <div className="rounded bg-r-500 p-[8px] pt-[16px]">
      {childQuestionSets && childQuestionSets.length > 0 ? (
        <div className="bg-r-200 px-[4px]">
          {childQuestionSets.map((childQuestionSet) => (
            <div key={childQuestionSet.formQuestionSetID}>
              {childQuestionSet.formQuestionSetPosition === 1 && (
                <NonEmptyQuestionSetDropzone
                  position={1}
                  questionSet={formQuestionSet}
                  isFirstDropzone={true}
                />
              )}
              <TemplateQuestionSet
                key={childQuestionSet.formQuestionSetID}
                formQuestionSet={childQuestionSet}
              />
              <NonEmptyQuestionSetDropzone
                position={childQuestionSet.formQuestionSetPosition + 1}
                questionSet={formQuestionSet}
                isLastDropzone={
                  childQuestionSets &&
                  childQuestionSets.length === childQuestionSet.formQuestionSetPosition
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyQuestionSetDropzone questionSet={formQuestionSet} />
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
