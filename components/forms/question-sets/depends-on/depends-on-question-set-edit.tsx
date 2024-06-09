'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { QuestionType, QuestionTypes } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import useQuestionActions from '@/hooks/template/use-question-actions'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'
import { RadioQuestionType } from '@/lib/types/qusetion'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
  selected: boolean
}

export default function DependsOnQuestionSetEdit({
  questionSet,
  selected = false,
}: DependsOnQuestionSetEditProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { updateQuestion } = useQuestionActions()

  const questionSets = questionSet.questionSets
  const question = questionSet.questions?.[0] as RadioQuestionType
  const isInline = question?.settings?.display === 'inline'
  const options = question?.settings?.options || []

  const questionPromptInputRef = useRef<HTMLTextAreaElement>(null)

  const rawDependsOnQuestion: QuestionType = {
    id: generateRandomID(),
    type: QuestionTypes.RADIO,
    prompt: 'Question Prompt',
    position: 0,
    helperText: 'No helper text',
    settings: {
      options: [
        { position: 0, value: 'Yes' },
        { position: 1, value: 'No' },
      ],
      display: 'inline',
    },
    questionSetID: questionSet.id,
  }

  function handleClickEditQuestion() {
    setIsEditing(true)
  }

  function adjustTextareaHeight() {
    const textarea = questionPromptInputRef.current
    if (textarea) {
      textarea.style.height = '29px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handlePromptChange() {
    adjustTextareaHeight()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      const updatedQuestion = question
        ? { ...question, prompt: e.currentTarget.value }
        : rawDependsOnQuestion
      updateQuestion(updatedQuestion)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideQuestionPrompt(e: MouseEvent) {
      if (
        questionPromptInputRef.current &&
        !questionPromptInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false)
        const updatedQuestion = question
          ? { ...question, prompt: questionPromptInputRef.current.value }
          : rawDependsOnQuestion
        updateQuestion(updatedQuestion)
      }
    }

    if (isEditing) {
      adjustTextareaHeight()

      const textarea = questionPromptInputRef.current
      if (textarea) {
        textarea.focus()

        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideQuestionPrompt)
    return () => document.removeEventListener('mousedown', handleClickOutsideQuestionPrompt)
  }, [question, isEditing])

  return (
    <div
      className={`group/questionSet rounded bg-b-500 text-[14px] ${selected ? 'border-[3px] border-b-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      <div className="rounded bg-n-200 p-[8px]">
        {isEditing ? (
          <textarea
            ref={questionPromptInputRef}
            className="mb-[8px] ml-[-3px] mr-[8px] block w-full resize-none overflow-hidden rounded-sm border-[2px] border-dashed border-b-300 bg-n-100 px-[2px] pb-[2px] pt-[1px] focus:border-[1px] focus:border-b-500 focus:outline-none"
            defaultValue={question?.prompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="group/prompt mb-[10px] mr-[8px] mt-[2px] flex w-full gap-[8px]">
            <div>{question?.prompt}</div>
            <div
              onClick={handleClickEditQuestion}
              className="cursor-pointer opacity-0 transition duration-75 group-hover/prompt:opacity-100"
            >
              <FiEdit2 className="mt-[1px] h-[16px] w-[16px]" />
            </div>
          </div>
        )}
        <div className={`flex ${isInline ? 'gap-[12px]' : 'flex-col gap-[2px]'}`}>
          {options.map((option: any) => (
            <div key={option.value} className="flex items-center gap-[4px]">
              <input type="radio" name="dependsOn" value={option.value} />
              <label className="text-[12px]">{option.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[4px] flex gap-[4px]">
        <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-400">Yes</div>
        <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-600 text-n-100">
          No
        </div>
      </div>

      <div className="mt-[4px]">
        {questionSets && questionSets.length > 0 ? (
          <div className="rounded bg-b-300 px-[4px]">
            {questionSets.map((questionSet) => (
              <TemplateQuestionSet key={questionSet.id} questionSet={questionSet} />
            ))}
          </div>
        ) : (
          <EmptyQuestionSetDropzone questionSet={questionSet} />
        )}
      </div>
    </div>
  )
}
