import { TemplateQuestionSetType } from '@/lib/types/template'

interface LoopQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function LoopQuestionSetEdit({ questionSet }: LoopQuestionSetEditProps) {
  return <div className="rounded bg-r-500 p-[8px]">{questionSet.type}</div>
}
