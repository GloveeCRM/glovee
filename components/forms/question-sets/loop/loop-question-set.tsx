'use client'

import { FiPlus } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormQuestionSetType } from '@/lib/types/form'
import { createQuestionSetAndQuestions, deleteQuestionSet } from '@/lib/actions/form'
import { useOrgContext } from '@/contexts/org-context'
import { Separator } from '@/components/ui/separator'
import FormQuestionSet from '../form-question-set'
import { useAuthContext } from '@/contexts/auth-context'

interface LoopQuestionSetProps {
  questionSet: FormQuestionSetType
  viewOnly?: boolean
}

export default function LoopQuestionSet({ questionSet, viewOnly = false }: LoopQuestionSetProps) {
  const { sessionUserID } = useAuthContext()

  const questionSets = questionSet.questionSets

  function handleDeleteQuestionSet(questionSetID: number) {
    deleteQuestionSet(sessionUserID || 0, questionSetID)
  }

  return (
    <div>
      {questionSets && questionSets.length > 0 ? (
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[12px]">
            {questionSets.map((qs) => (
              <div key={qs.id}>
                <div className="flex gap-[6px]">
                  <FormQuestionSet key={qs.id} questionSet={qs} />
                  {qs.position !== 0 && (
                    <div
                      className="flex cursor-pointer items-center rounded bg-red-500/30 p-[4px] text-red-700 transition duration-150 hover:bg-red-500/50 hover:text-red-900"
                      onClick={() => handleDeleteQuestionSet(qs.id)}
                    >
                      <BiTrash className="h-[22px] w-[22px]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Separator className="bg-n-400" />
          <RepeatQuestionSet questionSet={questionSet} />
        </div>
      ) : (
        <div className="text-[14px] text-r-700">No question sets</div>
      )}
    </div>
  )
}

function RepeatQuestionSet({ questionSet }: { questionSet: FormQuestionSetType }) {
  const { sessionUserID } = useAuthContext()

  function handleClick() {
    let questionSetToClone = questionSet.questionSets?.[0] as FormQuestionSetType
    questionSetToClone = { ...questionSetToClone, position: questionSet.questionSets?.length || 0 }
    if (questionSetToClone) {
      createQuestionSetAndQuestions(sessionUserID || 0, questionSetToClone)
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
