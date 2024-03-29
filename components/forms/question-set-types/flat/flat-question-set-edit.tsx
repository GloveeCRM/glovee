import { useState } from 'react'

import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'
import TextInputQuestionEdit from '../../question-input-types/text-input-question/text-input-question-edit'

interface FlatQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  const questions = questionSet.questions

  return (
    <div className="rounded bg-g-500 p-[6px] pt-[12px]">
      {questions ? (
        <FlatQuestionSetEditQuestionWrapper questions={questions} />
      ) : (
        <EmptyFlatQuestionSetQuestionDropzone />
      )}
    </div>
  )
}

function EmptyFlatQuestionSetQuestionDropzone() {
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

  return (
    <div
      className={`rounded border-[1px] border-dashed ${isDraggedOver ? 'border-n-600 bg-g-200' : 'border-n-500 bg-g-200/80'}`}
    >
      <div
        className="flex h-[65px] items-center justify-center text-center text-[12px]"
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDraggedOver(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDraggedOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          console.log('drop')
        }}
      >
        Drag an Input Type Here
      </div>
    </div>
  )
}

interface FlatQuestionSetEditQuestionWrapperProps {
  questions: TemplateQuestionType[]
}

function FlatQuestionSetEditQuestionWrapper({
  questions,
}: FlatQuestionSetEditQuestionWrapperProps) {
  return (
    <div className="flex flex-col gap-[6px] rounded bg-g-200/80 px-[6px] py-[8px]">
      {questions.map((question) =>
        question.type === 'text-input' ? (
          <TextInputQuestionEdit key={question.id} question={question} />
        ) : (
          <div key={question.id}>{question.type}</div>
        )
      )}
    </div>
  )
}
