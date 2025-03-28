'use client'

import { FiPlus } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormQuestionModes, FormQuestionSetType } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'
import useFormActions from '@/hooks/form/use-form-actions'

import FormQuestionSet from '@/components/forms/question-sets/form-question-set'
import { Separator } from '@/components/ui/separator'

interface RepeatableQuestionSetProps {
  formQuestionSet: FormQuestionSetType
}

export default function RepeatableQuestionSet({ formQuestionSet }: RepeatableQuestionSetProps) {
  const { formQuestionSetChildFormQuestionSets, mode } = useFormContext()
  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)
  const { deleteFormQuestionSet } = useFormActions()

  function handleDeleteQuestionSet(formQuestionSetID: number) {
    deleteFormQuestionSet({ formQuestionSetID })
  }

  const isAnswerOnly = mode === FormQuestionModes.ANSWER_ONLY

  return (
    <div>
      {childQuestionSets && childQuestionSets.length > 0 ? (
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[12px]">
            {childQuestionSets.map((qs) => (
              <div key={qs.formQuestionSetID}>
                <div className="flex gap-[6px]">
                  <FormQuestionSet key={qs.formQuestionSetID} formQuestionSet={qs} />
                  {!isAnswerOnly && qs.formQuestionSetPosition !== 1 && (
                    <div
                      className="flex cursor-pointer items-center rounded bg-red-500/30 p-[4px] text-red-700 transition duration-150 hover:bg-red-500/50 hover:text-red-900"
                      onClick={() => handleDeleteQuestionSet(qs.formQuestionSetID)}
                    >
                      <BiTrash className="h-[22px] w-[22px]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!isAnswerOnly && (
            <>
              <Separator className="bg-n-400" />
              <RepeatQuestionSetButton
                formQuestionSetID={childQuestionSets[0].formQuestionSetID || 0}
              />
            </>
          )}
        </div>
      ) : (
        <div className="text-[14px] text-r-700">No question sets</div>
      )}
    </div>
  )
}

interface RepeatQuestionSetButtonProps {
  formQuestionSetID: number
}

function RepeatQuestionSetButton({ formQuestionSetID }: RepeatQuestionSetButtonProps) {
  const { repeatFormQuestionSet } = useFormActions()

  function handleClick() {
    repeatFormQuestionSet({ formQuestionSetID })
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
