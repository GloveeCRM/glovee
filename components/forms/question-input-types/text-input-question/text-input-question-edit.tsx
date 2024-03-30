import { TemplateQuestionType } from '@/lib/types/template'
import useQuestionActions from '@/hooks/template/use-question-actions'
import TextInputQuestionEditMenuButton from './text-input-question-edit-menu-button'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import { useEffect, useRef } from 'react'

interface TextInputQuestionEditProps {
  question: TemplateQuestionType
}

export default function TextInputQuestionEdit({ question }: TextInputQuestionEditProps) {
  const { setSelectedQuestionSetId, selectedQuestionId, setSelectedQuestionId } =
    useTemplateEditContext()
  const { removeQuestionFromSection } = useQuestionActions()

  const textInputQuestionEditRef = useRef<HTMLDivElement>(null)

  const isQuestionSelected = selectedQuestionId === question.id

  function handleClickDeleteQuestion() {
    removeQuestionFromSection(question.id)
  }

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetId('')
    setSelectedQuestionId(question.id)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        textInputQuestionEditRef.current &&
        !textInputQuestionEditRef.current.contains(e.target as Node)
      ) {
        setSelectedQuestionId('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`group rounded bg-n-100 text-[14px] ${isQuestionSelected ? 'border-[1px] border-n-700 p-[5px]' : 'p-[6px]'}`}
      ref={textInputQuestionEditRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        <div className="mb-[4px]">{question.prompt}</div>
        <TextInputQuestionEditMenuButton
          onClickDelete={handleClickDeleteQuestion}
          display={isQuestionSelected}
        />
      </div>
      <input
        type="text"
        className="h-[32px] w-full cursor-default rounded border-[1px] border-n-400 bg-n-100 px-[6px] text-[12px] focus:outline-none"
        placeholder={question.type}
        readOnly
      />
    </div>
  )
}
