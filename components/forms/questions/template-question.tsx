'use client'

import { useEffect, useRef, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FiEdit, FiEdit2, FiMoreHorizontal } from 'react-icons/fi'

import { TemplateQuestionType } from '@/lib/types/template'
import {
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextInputQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/qusetion'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionActions from '@/hooks/template/use-question-actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TextInputQuestion from './text-input-question/text-input-question'
import TextareaQuestion from './textarea-question/textarea-question'
import SelectQuestion from './select-question/select-question'
import DateInputQuestion from './date-input-question/date-input-question'
import RadioQuestion from './radio-question/radio-question'
import CheckboxQuestion from './checkbox-question/checkbox-question'
import DocumentQuestion from './document-question/document-question'

interface TemplateQuestionProps {
  question: TemplateQuestionType
}

export default function TemplateQuestion({ question }: TemplateQuestionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const { selectedQuestionID, setSelectedQuestionID } = useTemplateEditContext()
  const { removeQuestionFromQuestionSet, updateQuestion } = useQuestionActions()

  const questionRef = useRef<HTMLDivElement>(null)
  const questionPromptInputRef = useRef<HTMLTextAreaElement>(null)

  const isQuestionSelected = selectedQuestionID === question.id

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionID(question.id)
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

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  function handleClickDeleteQuestion() {
    removeQuestionFromQuestionSet(question.id)
    setSelectedQuestionID(0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      updateQuestion({ ...question, prompt: e.currentTarget.value })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideQuestion(e: MouseEvent) {
      if (questionRef.current && !questionRef.current.contains(e.target as Node)) {
        setSelectedQuestionID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideQuestion)
    return () => document.removeEventListener('mousedown', handleClickOutsideQuestion)
  }, [setSelectedQuestionID])

  useEffect(() => {
    function handleClickOutsideQuestionPrompt(e: MouseEvent) {
      if (
        questionPromptInputRef.current &&
        !questionPromptInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false)
        updateQuestion({ ...question, prompt: questionPromptInputRef.current.value })
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
  }, [isEditing])

  return (
    <div
      className={`group/question rounded bg-n-100 p-[8px] text-[14px] ${isQuestionSelected && 'outline outline-b-500'}`}
      ref={questionRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        {isEditing ? (
          <textarea
            ref={questionPromptInputRef}
            className="mb-[8px] ml-[-3px] mr-[8px] block w-full resize-none overflow-hidden rounded-sm border-[2px] border-dashed border-b-300 bg-n-100 px-[2px] pb-[2px] pt-[1px] focus:border-[1px] focus:border-b-500 focus:outline-none"
            defaultValue={question.prompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="group/prompt mb-[10px] mr-[8px] mt-[2px] flex w-full gap-[8px]">
            <div>{question.prompt}</div>
            <div
              onClick={handleClickEditQuestion}
              className="cursor-pointer opacity-0 transition duration-75 group-hover/prompt:opacity-100"
            >
              <FiEdit2 className="mt-[1px] h-[16px] w-[16px]" />
            </div>
          </div>
        )}
        <DropdownMenu open={isOptionsMenuOpen} onOpenChange={handleOptionsDropdownMenuOpenChange}>
          <DropdownMenuTrigger
            className={`flex h-[10px] items-center rounded-sm bg-n-100 text-n-700 opacity-0 transition duration-75 group-hover/question:opacity-100 ${isOptionsMenuOpen && 'opacity-100'}`}
          >
            <FiMoreHorizontal className="h-[20px] w-[20px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-[160px]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleClickDeleteQuestion}
                className="flex gap-[6px] focus:text-red-500"
              >
                <BiTrash className="h-[18px] w-[18px]" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isTextInputQuestionType(question) ? (
        <TextInputQuestion question={question} readOnly={true} />
      ) : isTextareaQuestionType(question) ? (
        <TextareaQuestion question={question} readOnly={true} />
      ) : isSelectQuestionType(question) ? (
        <SelectQuestion question={question} readOnly={true} />
      ) : isDateInputQuestionType(question) ? (
        <DateInputQuestion question={question} readOnly={true} />
      ) : isRadioQuestionType(question) ? (
        <RadioQuestion question={question} readOnly={true} />
      ) : isCheckboxQuestionType(question) ? (
        <CheckboxQuestion question={question} readOnly={true} />
      ) : isDocumentQuestionType(question) ? (
        <DocumentQuestion question={question} readOnly={true} />
      ) : null}
    </div>
  )
}
