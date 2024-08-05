'use client'

import { FiPlus } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { ApplicationQuestionSetType } from '@/lib/types/application'
import { createQuestionSetAndQuestions, deleteQuestionSet } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'
import { Separator } from '@/components/ui/separator'
import ApplicationQuestionSet from '../application-question-set'

interface LoopQuestionSetProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function LoopQuestionSet({ questionSet, viewOnly = false }: LoopQuestionSetProps) {
  const { orgName } = useOrgContext()

  const questionSets = questionSet.questionSets

  function handleDeleteQuestionSet(questionSetID: number) {
    deleteQuestionSet(orgName, questionSetID)
  }

  return (
    <div>
      {questionSets && questionSets.length > 0 ? (
        <div>
          {questionSets.map((qs) => (
            <div key={qs.id}>
              <div className="flex gap-[6px]">
                <ApplicationQuestionSet key={qs.id} questionSet={qs} />
                {qs.position !== 0 && (
                  <div
                    className="flex cursor-pointer items-center rounded bg-red-500/30 p-[4px] text-red-700 transition duration-150 hover:bg-red-500/50 hover:text-red-900"
                    onClick={() => handleDeleteQuestionSet(qs.id)}
                  >
                    <BiTrash className="h-[22px] w-[22px]" />
                  </div>
                )}
              </div>
              <Separator className="my-[18px] bg-n-300" />
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
      className="mx-auto flex w-fit cursor-pointer items-center justify-center rounded-full px-[8px] py-[2px] text-[14px] transition duration-75 hover:bg-n-100"
      onClick={handleClick}
    >
      <FiPlus className="h-[18px] w-[18px]" />
      Add Another One
    </div>
  )
}
