'use client'

import { repeatApplicationFormQuestionSet } from '@/lib/actions/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

interface RepeatFormQuestionSetProps {
  formQuestionSetID: number
}

interface RepeatFormQuestionSetResponse {
  error?: string
}

export default function useFormActions() {
  const { setSelectedFormSectionQuestionSets, setSelectedFormSectionQuestions } =
    useApplicationFormContext()

  async function repeatFormQuestionSet({
    formQuestionSetID,
  }: RepeatFormQuestionSetProps): Promise<RepeatFormQuestionSetResponse> {
    const { formQuestionSets, formQuestions, error } = await repeatApplicationFormQuestionSet({
      formQuestionSetID,
    })
    console.log('formQuestionSets', formQuestionSets)
    console.log('formQuestions', formQuestions)
    console.log('error', error)
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  return { repeatFormQuestionSet }
}
