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
    <div>
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
