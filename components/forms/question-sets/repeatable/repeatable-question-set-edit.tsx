import { FiPlus } from 'react-icons/fi'

import { FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import FormTemplateQuestionSet from '../form-template-question-set'

interface RepeatableQuestionSetEditProps {
  formQuestionSet: FormQuestionSetType
}

export default function RepeatableQuestionSetEdit({
  formQuestionSet,
}: RepeatableQuestionSetEditProps) {
  const { formQuestionSetChildFormQuestionSets } = useFormContext()
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
              <FormTemplateQuestionSet
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
      <RepeatableQuestionSetEditFooter />
    </div>
  )
}

function RepeatableQuestionSetEditFooter() {
  return (
    <div className="mx-auto mt-[6px] flex w-fit items-center text-[14px] font-medium">
      <FiPlus className="h-[18px] w-[18px]" />
      <span>Add another one</span>
    </div>
  )
}
