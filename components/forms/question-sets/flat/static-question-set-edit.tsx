import { FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'

import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import TemplateQuestion from '../../questions/template-question'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'

interface StaticQuestionSetEditProps {
  questionSet: FormQuestionSetType
}

export default function StaticQuestionSetEdit({ questionSet }: StaticQuestionSetEditProps) {
  const { formQuestionSetQuestions } = useFormContext()
  const questionSetQuestions = formQuestionSetQuestions(questionSet.formQuestionSetID)

  return (
    <div className="rounded bg-g-500 p-[8px] pt-[16px]">
      {questionSetQuestions && questionSetQuestions.length > 0 ? (
        <div className="rounded bg-g-200/80 px-[6px] py-[2px]">
          {questionSetQuestions.map((question) => (
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
                isLastDropzone={questionSetQuestions.length === question.formQuestionPosition}
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
