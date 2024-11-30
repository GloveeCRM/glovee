'use client'

import { useEffect, useRef, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FiEdit2, FiMoreHorizontal } from 'react-icons/fi'

import {
  FormQuestionType,
  isCheckboxQuestionType,
  isDateQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/form'
import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

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
import { isDocumentQuestionType } from '@/lib/types/qusetion'

interface TemplateQuestionProps {
  formQuestion: FormQuestionType
}

export default function TemplateQuestion({ formQuestion }: TemplateQuestionProps) {
  console.log('formQuestion', formQuestion)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const { selectedFormQuestionID, setSelectedFormQuestionID } = useFormTemplateEditContext()
  const { deleteFormQuestion, updateFormQuestion } = useQuestionActions()

  const questionRef = useRef<HTMLDivElement>(null)
  const questionPromptInputRef = useRef<HTMLTextAreaElement>(null)

  const isQuestionSelected = selectedFormQuestionID === formQuestion.formQuestionID

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedFormQuestionID(formQuestion.formQuestionID)
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

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  function handleClickDeleteQuestion() {
    deleteFormQuestion({ formQuestionID: formQuestion.formQuestionID })
    setSelectedFormQuestionID(0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    let updatedFormQuestion: FormQuestionType = {
      ...formQuestion,
      formQuestionPrompt: e.currentTarget.value,
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      updateFormQuestion({ updatedFormQuestion })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideQuestion(e: MouseEvent) {
      const targetElement = e.target as HTMLElement

      if (targetElement.closest('#templateEditToolbar')) {
        return
      }

      if (questionRef.current && !questionRef.current.contains(e.target as Node)) {
        setSelectedFormQuestionID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideQuestion)
    return () => document.removeEventListener('mousedown', handleClickOutsideQuestion)
  }, [setSelectedFormQuestionID])

  useEffect(() => {
    function handleClickOutsideQuestionPrompt(e: MouseEvent) {
      let updatedFormQuestion: FormQuestionType = {
        ...formQuestion,
        formQuestionPrompt: questionPromptInputRef.current?.value || '',
      }
      if (
        questionPromptInputRef.current &&
        !questionPromptInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false)
        updateFormQuestion({ updatedFormQuestion })
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
  }, [formQuestion, isEditing])

  return (
    <div
      className={`group/question rounded bg-n-100 p-[8px] text-[14px] ${isQuestionSelected && 'outline outline-offset-1 outline-blue-500'}`}
      ref={questionRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        {isEditing ? (
          <textarea
            ref={questionPromptInputRef}
            className="mb-[8px] ml-[-3px] mr-[8px] block w-full resize-none overflow-hidden rounded-sm border-[2px] border-dashed border-b-300 bg-n-100 px-[2px] pb-[2px] pt-[1px] focus:border-[1px] focus:border-b-500 focus:outline-none"
            defaultValue={formQuestion.formQuestionPrompt}
            onChange={handlePromptChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="group/prompt mb-[10px] mr-[8px] mt-[2px] flex w-full gap-[8px]">
            <div>{formQuestion.formQuestionPrompt}</div>
            <div
              onClick={handleClickEditPrompt}
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
      {isTextQuestionType(formQuestion) ? (
        <TextInputQuestion question={formQuestion} readOnly={true} />
      ) : isTextareaQuestionType(formQuestion) ? (
        <TextareaQuestion question={formQuestion} readOnly={true} />
      ) : isSelectQuestionType(formQuestion) ? (
        <SelectQuestion question={formQuestion} readOnly={true} />
      ) : isDateQuestionType(question) ? (
        <DateInputQuestion question={formQuestion} readOnly={true} />
      ) : isRadioQuestionType(formQuestion) ? (
        <RadioQuestion question={formQuestion} readOnly={true} />
      ) : isCheckboxQuestionType(formQuestion) ? (
        <CheckboxQuestion question={formQuestion} readOnly={true} />
      ) : isDocumentQuestionType(question) ? (
        <DocumentQuestion question={formQuestion} readOnly={true} />
      ) : null}
    </div>
  )
}
