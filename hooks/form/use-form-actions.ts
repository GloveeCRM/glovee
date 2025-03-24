'use client'

import {
  deleteApplicationFormQuestionSet,
  repeatApplicationFormQuestionSet,
} from '@/lib/actions/form'
import { useFormContext } from '@/contexts/form-context'

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
  const {
    setSelectedFormSectionQuestionSets,
    setSelectedFormSectionQuestions,
    setFormCategoryCompletionRate,
    setFormSectionCompletionRate,
  } = useFormContext()

  async function repeatFormQuestionSet({
    formQuestionSetID,
  }: RepeatFormQuestionSetProps): Promise<RepeatFormQuestionSetResponse> {
    const { formQuestionSets, formQuestions, completionRates, error } =
      await repeatApplicationFormQuestionSet({
        formQuestionSetID,
      })
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
      if (completionRates) {
        setFormCategoryCompletionRate(
          completionRates.formCategory.formCategoryID,
          completionRates.formCategory.completionRate
        )
        setFormSectionCompletionRate(
          completionRates.formSection.formSectionID,
          completionRates.formSection.completionRate
        )
      }
    }
    return { error }
  }

  async function deleteFormQuestionSet({
    formQuestionSetID,
  }: DeleteFormQuestionSetProps): Promise<DeleteFormQuestionSetResponse> {
    const { formQuestionSets, formQuestions, completionRates, error } =
      await deleteApplicationFormQuestionSet({
        formQuestionSetID,
      })
    if (!error) {
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
      if (completionRates) {
        setFormCategoryCompletionRate(
          completionRates.formCategory.formCategoryID,
          completionRates.formCategory.completionRate
        )
        setFormSectionCompletionRate(
          completionRates.formSection.formSectionID,
          completionRates.formSection.completionRate
        )
      }
    }
    return { error }
  }

  return {
    repeatFormQuestionSet,
    deleteFormQuestionSet,
  }
}
