import { Input } from '@/components/ui/input'
import { TextInputQuestionType } from '@/lib/types/qusetion'

interface TextInputQuestionProps {
  question: TextInputQuestionType
  readOnly?: boolean
}

export default function TextInputQuestion({ question, readOnly = false }: TextInputQuestionProps) {
  return <Input type="text" placeholder={question.settings.placeholder} readOnly={readOnly} />
}
