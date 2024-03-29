import { TemplateQuestionSetType } from '@/lib/types/template'

interface FlatQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function FlatQuestionSetEdit({ questionSet }: FlatQuestionSetEditProps) {
  return <div className="rounded bg-g-500 p-[8px]">{questionSet.type}</div>
}
