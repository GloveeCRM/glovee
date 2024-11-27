import { TemplateQuestionSetType } from '@/lib/types/template'
import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import TemplateQuestion from '../../questions/template-question'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import { FormQuestionSetType } from '@/lib/types/form'

interface FlatQuestionSetEditProps {
  questionSet: FormQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  const questions = questionSet.questions || []

  return (
    <div className="rounded bg-g-500 p-[8px] pt-[16px]">
      {questions && questions.length > 0 ? (
        <div className="rounded bg-g-200/80 px-[6px] py-[2px]">
          {questions.map((question) => (
            <div key={question.id}>
              {question.position === 1 && (
                <NonEmptyQuestionSetDropzone
                  position={1}
                  questionSet={questionSet}
                  isFirstDropzone={true}
                />
              )}
              <TemplateQuestion question={question} />
              <NonEmptyQuestionSetDropzone
                position={question.position + 1}
                questionSet={questionSet}
                isLastDropzone={questions.length === question.position + 1}
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
