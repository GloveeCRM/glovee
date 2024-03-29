import { TemplateQuestionSetType, TemplateQuestionType } from '@/lib/types/template'
import { useState } from 'react'

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
    <div className="rounded bg-g-200/80">
      {questions.map((question) => (
        <div key={question.id} className="rounded p-[4px]">
          {question.type}
        </div>
      ))}
    </div>
  )
}
