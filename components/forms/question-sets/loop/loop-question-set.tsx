'use client'

import { FiPlus } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { FormQuestionSetType } from '@/lib/types/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'
import useFormActions from '@/hooks/form/use-form-actions'

import { Separator } from '@/components/ui/separator'
import FormQuestionSet from '../form-question-set'

interface LoopQuestionSetProps {
  formQuestionSet: FormQuestionSetType
  mode: 'edit' | 'view'
  viewOnly?: boolean
}

export default function LoopQuestionSet({
  formQuestionSet,
  mode,
  viewOnly = false,
}: LoopQuestionSetProps) {
  const { formQuestionSetChildFormQuestionSets } = useApplicationFormContext()
  const childQuestionSets = formQuestionSetChildFormQuestionSets(formQuestionSet.formQuestionSetID)
  const { deleteFormQuestionSet } = useFormActions()

  function handleDeleteQuestionSet(formQuestionSetID: number) {
    deleteFormQuestionSet({ formQuestionSetID })
  }

  return (
    <div>
      {childQuestionSets && childQuestionSets.length > 0 ? (
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[12px]">
            {childQuestionSets.map((qs) => (
              <div key={qs.formQuestionSetID}>
                <div className="flex gap-[6px]">
                  <FormQuestionSet key={qs.formQuestionSetID} formQuestionSet={qs} mode={mode} />
                  {mode === 'edit' && qs.formQuestionSetPosition !== 1 && (
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
          {mode === 'edit' && (
            <>
              <Separator className="bg-n-400" />
              <RepeatQuestionSet formQuestionSetID={childQuestionSets[0].formQuestionSetID || 0} />
            </>
          )}
        </div>
      ) : (
        <div className="text-[14px] text-r-700">No question sets</div>
      )}
    </div>
  )
}

interface RepeatQuestionSetProps {
  formQuestionSetID: number
}

function RepeatQuestionSet({ formQuestionSetID }: RepeatQuestionSetProps) {
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
