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
      <div>{question.prompt}</div>
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
