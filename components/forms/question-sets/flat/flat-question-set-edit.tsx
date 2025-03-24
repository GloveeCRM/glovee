import { FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import TemplateQuestion from '../../questions/template-question'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'

interface FlatQuestionSetEditProps {
  questionSet: FormQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  const { formQuestionSetQuestions } = useFormContext()
  const qusetionSetQuestions = formQuestionSetQuestions(questionSet.formQuestionSetID)

  return (
    <div className="rounded bg-g-500 p-[8px] pt-[16px]">
      {qusetionSetQuestions && qusetionSetQuestions.length > 0 ? (
        <div className="rounded bg-g-200/80 px-[6px] py-[2px]">
          {qusetionSetQuestions.map((question) => (
            <div key={question.formQuestionID}>
              {question.formQuestionPosition === 1 && (
                <NonEmptyQuestionSetDropzone
                  position={1}
                  questionSet={questionSet}
                  isFirstDropzone={true}
                />
              )}
              <TemplateQuestion formQuestion={question} />
              <NonEmptyQuestionSetDropzone
                position={question.formQuestionPosition + 1}
                questionSet={questionSet}
                isLastDropzone={qusetionSetQuestions.length === question.formQuestionPosition}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyQuestionSetDropzone questionSet={questionSet} />
      )}
    </div>
  )
}
