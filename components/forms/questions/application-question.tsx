import { LiaQuestionCircle } from 'react-icons/lia'
import { IoCheckmarkCircle } from 'react-icons/io5'

import {
  QuestionType,
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextInputQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/qusetion'
import TextInputQuestion from './text-input-question/text-input-question'
import TextareaQuestion from './textarea-question/textarea-question'
import CheckboxQuestion from './checkbox-question/checkbox-question'
import DocumentQuestion from './document-question/document-question'
import RadioQuestion from './radio-question/radio-question'
import DateInputQuestion from './date-input-question/date-input-question'
import SelectQuestion from './select-question/select-question'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ApplicationQuestionProps {
  question: QuestionType
  viewOnly?: boolean
}

export default function ApplicationQuestion({
  question,
  viewOnly = false,
}: ApplicationQuestionProps) {
  return (
    <div className="flex flex-col gap-[6px] p-[4px] text-[14px]">
      <div className="flex justify-between">
        <div className="relative w-[calc(100%-50px)]">
          <span>{question.prompt}</span>
          {question.settings.isRequired && (
            <span className="absolute mt-[-6px] text-[24px] text-[red]">*</span>
          )}
          {question.helperText && (
            <Popover>
              <PopoverTrigger asChild>
                <span
                  className={`absolute ${question.settings.isRequired ? 'ml-[12px]' : 'ml-[6px]'}`}
                >
                  <LiaQuestionCircle className="text-n-450 h-[21px] w-[21px] cursor-pointer data-[state=open]:text-n-800" />
                </span>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="max-w-[340px]">
                <div className="p-[8px] text-[12px]">{question.helperText}</div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="">
          <IoCheckmarkCircle
            className={`h-[20px] w-[20px] ${question.answer?.isAcceptable ? 'text-g-700' : 'text-n-400'}`}
          />
        </div>
      </div>
      <div>
        {isTextInputQuestionType(question) ? (
          <TextInputQuestion question={question} />
        ) : isTextareaQuestionType(question) ? (
          <TextareaQuestion question={question} />
        ) : isSelectQuestionType(question) ? (
          <SelectQuestion question={question} />
        ) : isDateInputQuestionType(question) ? (
          <DateInputQuestion question={question} />
        ) : isRadioQuestionType(question) ? (
          <RadioQuestion question={question} />
        ) : isCheckboxQuestionType(question) ? (
          <CheckboxQuestion question={question} />
        ) : isDocumentQuestionType(question) ? (
          <DocumentQuestion question={question} />
        ) : null}
      </div>
    </div>
  )
}
