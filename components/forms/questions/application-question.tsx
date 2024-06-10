import { LiaQuestionCircle } from 'react-icons/lia'

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
      <div className="flex items-center">
        <span>{question.prompt}</span>
        {question.settings.isRequired && (
          <span className="flex h-[12px] w-[12px] items-center justify-center text-[20px] text-[red]">
            *
          </span>
        )}
        {question.helperText && (
          <Popover>
            <PopoverTrigger asChild>
              <LiaQuestionCircle className="text-n-450 ml-[4px] h-[21px] w-[21px] cursor-pointer data-[state=open]:text-n-800" />
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="max-w-[340px]">
              <div className="p-[8px] text-[12px]">{question.helperText}</div>
            </PopoverContent>
          </Popover>
        )}
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
