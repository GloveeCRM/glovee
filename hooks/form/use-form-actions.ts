'use client'

import {
  deleteApplicationFormQuestionSet,
  repeatApplicationFormQuestionSet,
} from '@/lib/actions/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

interface RepeatFormQuestionSetProps {
  formQuestionSetID: number
}

interface RepeatFormQuestionSetResponse {
  error?: string
}

interface DeleteFormQuestionSetProps {
  formQuestionSetID: number
}

interface DeleteFormQuestionSetResponse {
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
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function deleteFormQuestionSet({
    formQuestionSetID,
  }: DeleteFormQuestionSetProps): Promise<DeleteFormQuestionSetResponse> {
    const { formQuestionSets, formQuestions, error } = await deleteApplicationFormQuestionSet({
      formQuestionSetID,
    })
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  return {
    repeatFormQuestionSet,
    deleteFormQuestionSet,
  }
}
