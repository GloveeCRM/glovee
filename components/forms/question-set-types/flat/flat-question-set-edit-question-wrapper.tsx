import { TemplateQuestionType } from '@/lib/types/template'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question-edit'
import NonEmptyQuestionSetDropzone from '@/components/admin/template/edit/non-empty-question-set-dropzone'
import TextareaQuestionEdit from '../../question-input-types/textarea-question/textarea-question-edit'

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
          {question.type === 'textInput' ? (
            <TextInputQuestionEdit key={question.id} question={question} />
          ) : question.type === 'textarea' ? (
            <TextareaQuestionEdit key={question.id} question={question} />
          ) : (
            <div key={question.id}>{question.type}</div>
          )}
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
