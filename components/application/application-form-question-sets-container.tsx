'use client'

import { BsInfoSquare } from 'react-icons/bs'

import { ApplicationFormStatusTypes, FormQuestionModes } from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'
import { useApplicationFormContext } from '@/contexts/application-form-context'

import { Callout } from '@/components/ui/callout'
import FormQuestionSetsContainer from '@/components/client/application-form/form-question-sets-container'

export default function ApplicationFormQuestionSetsContainer() {
  const { applicationForm } = useApplicationFormContext()
  const { mode } = useFormContext()

  return (
    <div className="flex h-full flex-col">
      {mode === FormQuestionModes.ANSWER_ONLY &&
      applicationForm.status === ApplicationFormStatusTypes.PENDING_CLIENT_SUBMISSION ? (
        <Callout variant="custom" className="m-[8px] flex gap-[12px] bg-coral-700">
          <BsInfoSquare className="mt-[3px] h-[16px] w-[16px] flex-shrink-0 text-white" />
          <span className="text-white">
            Form is currently pending client submission. Answers will be visible once the
            application is submitted.
          </span>
        </Callout>
      ) : null}

      <FormQuestionSetsContainer />
    </div>
  )
}
