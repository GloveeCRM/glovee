import { LiaQuestionCircle } from 'react-icons/lia'
import { IoCheckmarkCircle } from 'react-icons/io5'

import {
  FormQuestionType,
  isCheckboxQuestionType,
  isDateQuestionType,
  isTextQuestionType,
  isFileQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextareaQuestionType,
} from '@/lib/types/form'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import TextQuestion from './text-question/text-question'
import TextareaQuestion from './textarea-question/textarea-question'
import CheckboxQuestion from './checkbox-question/checkbox-question'
import FileQuestion from './file-question/file-question'
import RadioQuestion from './radio-question/radio-question'
import DateQuestion from './date-question/date-question'
import SelectQuestion from './select-question/select-question'

interface FormQuestionProps {
  question: FormQuestionType
  viewOnly?: boolean
}

export default function FormQuestion({ question, viewOnly = false }: FormQuestionProps) {
  return (
    <div className="flex flex-col gap-[10px] p-[4px] text-[14px]">
      <div className="flex justify-between">
        <div className="relative w-[calc(100%-50px)]">
          <span>{question?.formQuestionPrompt}</span>
          {question?.formQuestionSettings?.isRequired && (
            <span className="absolute mt-[-6px] text-[24px] text-[red]">*</span>
          )}
          {question?.formQuestionSettings?.helperText && (
            <Popover>
              <PopoverTrigger asChild>
                <span
                  className={`absolute ${question?.formQuestionSettings?.isRequired ? 'ml-[12px]' : 'ml-[6px]'}`}
                >
                  <LiaQuestionCircle className="h-[21px] w-[21px] cursor-pointer text-n-450 data-[state=open]:text-n-800" />
                </span>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="max-w-[340px]">
                <div className="p-[8px] text-[12px]">
                  {question?.formQuestionSettings?.helperText}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="">
          <IoCheckmarkCircle
            className={`h-[20px] w-[20px] ${question?.answer?.isAcceptable ? 'text-g-700' : 'text-n-400'}`}
          />
        </div>
      </div>
      <div>
        {isTextQuestionType(question) ? (
          <TextQuestion formQuestion={question} />
        ) : isTextareaQuestionType(question) ? (
          <TextareaQuestion formQuestion={question} />
        ) : isSelectQuestionType(question) ? (
          <SelectQuestion formQuestion={question} />
        ) : isDateQuestionType(question) ? (
          <DateQuestion formQuestion={question} />
        ) : isRadioQuestionType(question) ? (
          <RadioQuestion formQuestion={question} />
        ) : isCheckboxQuestionType(question) ? (
          <CheckboxQuestion formQuestion={question} />
        ) : isFileQuestionType(question) ? (
          <FileQuestion formQuestion={question} />
        ) : null}
      </div>
    </div>
  )
}
