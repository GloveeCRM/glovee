'use client'

import { FiPlus } from 'react-icons/fi'

import { ApplicationQuestionSetType } from '@/lib/types/application'
import ApplicationQuestionSet from '../application-question-set'
import { createQuestionSetAndQuestions, deleteQuestionSet } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'

interface LoopQuestionSetViewProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function LoopQuestionSetView({
  questionSet,
  viewOnly = false,
}: LoopQuestionSetViewProps) {
  const { orgName } = useOrgContext()

  const questionSets = questionSet.questionSets

  function handleDeleteQuestionSet(questionSetID: number) {
    deleteQuestionSet(orgName, questionSetID)
  }

  return (
    <div className="rounded bg-r-500 p-[8px] pt-[16px]">
      {questionSets && questionSets.length > 0 ? (
        <div className="bg-r-200 px-[4px]">
          {questionSets.map((qs) => (
            <div key={qs.id} className="flex">
              {qs.position !== 0 && (
                <div
                  className="cursor-pointer text-r-700"
                  onClick={() => handleDeleteQuestionSet(qs.id)}
                >
                  Delete
                </div>
              )}
              <ApplicationQuestionSet key={qs.id} questionSet={qs} />
            </div>
          ))}
          <RepeatQuestionSet questionSet={questionSet} />
        </div>
      ) : (
        <div className="text-[14px] text-r-700">No question sets</div>
      )}
    </div>
  )
}

function RepeatQuestionSet({ questionSet }: { questionSet: ApplicationQuestionSetType }) {
  const { orgName } = useOrgContext()

  function handleClick() {
    let questionSetToClone = questionSet.questionSets?.[0] as ApplicationQuestionSetType
    questionSetToClone = { ...questionSetToClone, position: questionSet.questionSets?.length || 0 }
    if (questionSetToClone) {
      createQuestionSetAndQuestions(orgName, questionSetToClone)
    }
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-center text-[14px]"
      onClick={handleClick}
    >
      <FiPlus className="h-[18px] w-[18px]" />
      Add Another One
    </div>
  )
}
