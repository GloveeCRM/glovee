import { TemplateQuestionSetType } from '@/lib/types/template'
import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import TemplateQuestion from '../../questions/template-question'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'

interface FlatQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  const questions = questionSet.questions || []
  return (
    <div className="rounded bg-g-500 p-[8px] pt-[16px]">
      {questions && questions.length > 0 ? (
        <div className="rounded bg-g-200/80 px-[6px] py-[2px]">
          {questions.map((question) => (
            <div key={question.id}>
              {question.position === 0 && (
                <NonEmptyQuestionSetDropzone position={0} questionSet={questionSet} />
              )}
              <TemplateQuestion question={question} />
              <NonEmptyQuestionSetDropzone
                position={question.position + 1}
                questionSet={questionSet}
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
