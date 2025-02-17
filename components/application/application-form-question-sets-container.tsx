'use client'

import { BsInfoSquare } from 'react-icons/bs'

import { useApplicationFormContext } from '@/contexts/application-form-context'

import FormQuestionSet from '../forms/question-sets/form-question-set'
import { Callout } from '../ui/callout'
import { ApplicationFormStatusTypes } from '@/lib/types/form'

export default function ApplicationFormQuestionSetsContainer() {
  const { rootSelectedFormSectionQuestionSets, mode, applicationForm } = useApplicationFormContext()

  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll p-[8px]">
      {mode === 'view' &&
      applicationForm?.status === ApplicationFormStatusTypes.PENDING_CLIENT_SUBMISSION ? (
        <Callout variant="custom" className="flex gap-[12px] bg-coral-700">
          <BsInfoSquare className="mt-[3px] h-[16px] w-[16px] flex-shrink-0 text-white" />
          <span className="text-white">
            Form is currently pending client submission. Answers will be visible once the
            application is submitted.
          </span>
        </Callout>
      ) : null}

      {rootSelectedFormSectionQuestionSets && rootSelectedFormSectionQuestionSets.length > 0 ? (
        rootSelectedFormSectionQuestionSets.map((formQuestionSet) => (
          <div
            key={formQuestionSet.formQuestionSetID}
            className="flex w-full flex-col gap-[8px] rounded-lg border border-zinc-400 p-[8px]"
          >
            <FormQuestionSet
              key={formQuestionSet.formQuestionSetID}
              formQuestionSet={formQuestionSet}
              mode={mode}
            />
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}
