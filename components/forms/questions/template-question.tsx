'use client'

import { useEffect, useRef, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FiMoreHorizontal } from 'react-icons/fi'

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
  const { setSelectedQuestionSetID, selectedQuestionID, setSelectedQuestionID } =
    useTemplateEditContext()
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const { removeQuestionFromSection } = useQuestionActions()

  const questionEditRef = useRef<HTMLDivElement>(null)

  const isQuestionSelected = selectedQuestionID === question.id

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  function handleClickDeleteQuestion() {
    removeQuestionFromSection(question.id)
  }

  function handleClickQuestion(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetID(0)
    setSelectedQuestionID(question.id)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (questionEditRef.current && !questionEditRef.current.contains(e.target as Node)) {
        setSelectedQuestionID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSelectedQuestionID])

  return (
    <div
      className={`group/question rounded bg-n-100 text-[14px] ${isQuestionSelected ? 'border-[1px] border-n-700 p-[5px]' : 'p-[6px]'}`}
      ref={questionEditRef}
      onClick={handleClickQuestion}
    >
      <div className="flex justify-between">
        <div className="mb-[4px]">{question.prompt}</div>
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
