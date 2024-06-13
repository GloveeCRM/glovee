'use client'

import { useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { TemplateQuestionSetType } from '@/lib/types/template'
import { QuestionType, QuestionTypes, RadioQuestionType } from '@/lib/types/qusetion'
import { generateRandomID } from '@/lib/utils/id'
import useQuestionActions from '@/hooks/template/use-question-actions'
import NonEmptyQuestionSetDropzone from '../non-empty-question-set-dropzone'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
  selected: boolean
}

export default function DependsOnQuestionSetEdit({
  questionSet,
  selected = false,
}: DependsOnQuestionSetEditProps) {
  const question = questionSet.questions?.[0] as RadioQuestionType
  const isInline = question.settings.display === 'inline'
  const options = question.settings.options || []

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>(options[0].value || '')
  const { updateQuestion } = useQuestionActions()

  const questionPromptInputRef = useRef<HTMLTextAreaElement>(null)

  const questionSets = questionSet.questionSets
  const questionSetsToDisplay = questionSets?.filter(
    (qs) => qs.dependsOn?.option === selectedOption
  )

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
      isRequired: false,
      display: 'inline',
    },
    questionSetID: questionSet.id,
  }

  function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value)
  }

  function handleClickEditPrompt() {
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
              onClick={handleClickEditPrompt}
              className="cursor-pointer opacity-0 transition duration-75 group-hover/prompt:opacity-100"
            >
              <FiEdit2 className="mt-[1px] h-[16px] w-[16px]" />
            </div>
          </div>
        )}
        <div className={`flex ${isInline ? 'gap-[18px]' : 'flex-col gap-[4px]'}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-start gap-[4px]"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedOption(option.value)
              }}
            >
              <input
                type="radio"
                name={String(question?.id)}
                value={option.value}
                checked={selectedOption === option.value}
                className="mt-[2px] h-[14px] w-[14px]"
                onChange={handleSelectOption}
              />
              <label className="text-[12px] text-n-500">{option.value}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[4px] flex gap-[4px]">
        {options.map((option) => (
          <div
            key={option.value}
            className={`flex h-[30px] w-full items-center justify-center rounded ${
              selectedOption === option.value ? 'bg-n-700 text-n-100' : 'bg-b-300'
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSelectedOption(option.value)
            }}
          >
            {option.value}
          </div>
        ))}
      </div>

      <div className="mt-[4px]">
        {questionSetsToDisplay && questionSetsToDisplay.length > 0 ? (
          <div className="rounded bg-b-300 px-[4px]">
            {questionSetsToDisplay.map((qs) => (
              <div key={qs.id}>
                {qs.position === 0 && (
                  <NonEmptyQuestionSetDropzone
                    questionSet={questionSet}
                    position={0}
                    dependsOn={{ option: selectedOption }}
                  />
                )}
                <TemplateQuestionSet questionSet={qs} />
                <NonEmptyQuestionSetDropzone
                  questionSet={questionSet}
                  position={questionSet.position + 1}
                  dependsOn={{ option: selectedOption }}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyQuestionSetDropzone
            questionSet={questionSet}
            dependsOn={{ option: selectedOption }}
          />
        )}
      </div>
    </div>
  )
}
