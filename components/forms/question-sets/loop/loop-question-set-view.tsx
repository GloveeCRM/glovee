'use client'

import { ApplicationQuestionSetType } from '@/lib/types/application'
import ApplicationQuestionSet from '../application-question-set'

interface LoopQuestionSetViewProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function LoopQuestionSetView({
  questionSet,
  viewOnly = false,
}: LoopQuestionSetViewProps) {
  const questionSets = questionSet.questionSets

  return (
    <div className="rounded bg-r-500 p-[8px] pt-[16px]">
      {questionSets && questionSets.length > 0 ? (
        <div className="bg-r-200 px-[4px]">
          {questionSets.map((qs) => (
            <div key={qs.id}>
              <ApplicationQuestionSet key={qs.id} questionSet={qs} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[14px] text-r-700">No question sets</div>
      )}
    </div>
  )
}
