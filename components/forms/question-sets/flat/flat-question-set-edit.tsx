import { TemplateQuestionSetType as TemplateQuestionSetTypes } from '@prisma/client'
import { TemplateQuestionType } from '@/lib/types/template'
import NonEmptyQuestionSetDropzone from '@/components/admin/template/edit/non-empty-question-set-dropzone'
import TemplateQuestion from '../../questions/template-question'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'

interface FlatQuestionSetEditProps {
  questionSetId: string
  questions: TemplateQuestionType[]
  selected: boolean
}

export default function FlatQuestionSetEdit({
  questionSetId,
  questions,
  selected = false,
}: FlatQuestionSetEditProps) {
  return (
    <div
      className={`rounded bg-g-500 ${selected ? 'border-[3px] border-g-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      {questions && questions.length > 0 ? (
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
      ) : (
        <EmptyQuestionSetDropzone
          questionSetId={questionSetId}
          questionSetType={TemplateQuestionSetTypes.FLAT}
        />
      )}
    </div>
  )
}
