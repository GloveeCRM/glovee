import { TemplateQuestionType } from '@/lib/types/template'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question'
import NonEmptyQuestionSetDropzone from '@/components/admin/template/edit/non-empty-question-set-dropzone'
import TextareaQuestionEdit from '../../question-input-types/textarea-question/textarea-question-edit'
import TemplateQuestion from '../../question-input-types/template-question'

interface FlatQuestionSetEditQuestionWrapperProps {
  questions: TemplateQuestionType[]
}

export default function FlatQuestionSetEditQuestionWrapper({
  questions,
}: FlatQuestionSetEditQuestionWrapperProps) {
  return (
    <div className="rounded bg-g-200/80 px-[6px] py-[2px]">
      {questions.map((question) => (
        <div key={question.id}>
          {question.position === 0 && (
            <NonEmptyQuestionSetDropzone
              position={0}
              questionSetId={question.questionSetId}
              questionSetType="flat"
            />
          )}
          <TemplateQuestion question={question} />
          <NonEmptyQuestionSetDropzone
            position={question.position + 1}
            questionSetId={question.questionSetId}
            questionSetType="flat"
          />
        </div>
      ))}
    </div>
  )
}
