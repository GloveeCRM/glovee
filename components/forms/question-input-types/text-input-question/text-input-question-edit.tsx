import { TemplateQuestionType } from '@/lib/types/template'
import useQuestionActions from '@/hooks/template/use-question-actions'
import TextInputQuestionEditMenuButton from './text-input-question-edit-menu-button'

interface TextInputQuestionEditProps {
  question: TemplateQuestionType
}

export default function TextInputQuestionEdit({ question }: TextInputQuestionEditProps) {
  const { removeQuestionFromSection } = useQuestionActions()

  function handleClickDeleteQuestion() {
    removeQuestionFromSection(question.id)
  }

  return (
    <div className="group rounded bg-n-100 p-[6px] text-[14px]">
      <div className="flex justify-between">
        <div className="mb-[4px]">{question.prompt}</div>
        <TextInputQuestionEditMenuButton onClickDelete={handleClickDeleteQuestion} />
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
