import SectionQuestionSetDropzone from '@/components/admin/template/edit/section-question-set-dropzone'
import { TemplateQuestionSetType } from '@/lib/types/template'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
}

export default function DependsOnQuestionSetEdit({ questionSet }: DependsOnQuestionSetEditProps) {
  const showQuestionSetDropzoneBefore = questionSet.position === 0

  return (
    <div>
      {showQuestionSetDropzoneBefore && (
        <SectionQuestionSetDropzone position={questionSet.position} />
      )}
      <div className="rounded bg-b-500 p-[8px]">{questionSet.type}</div>
      <SectionQuestionSetDropzone position={questionSet.position + 1} />
    </div>
  )
}
