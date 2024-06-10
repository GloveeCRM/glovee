import { ApplicationQuestionSetType } from '@/lib/types/application'

interface DependsOnQuestionSetViewProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function DependsOnQuestionSetView({
  questionSet,
  viewOnly = false,
}: DependsOnQuestionSetViewProps) {
  return (
    <div className="rounded bg-r-500 p-[8px] pt-[16px]">
      <div className="bg-r-200 px-[4px]">
        <div className="text-[14px] text-r-700">Depends on question set</div>
      </div>
    </div>
  )
}
