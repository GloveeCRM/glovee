import { TemplateQuestionSetType } from '@/lib/types/template'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function DependsOnQuestionSetEdit({ questionSet }: DependsOnQuestionSetEditProps) {
  return <div className="rounded bg-b-500 p-[8px]">{questionSet.type}</div>
}
