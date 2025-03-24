'use client'

import {
  FormQuestionDefaultOptionType,
  FormQuestionOptionType,
  FormQuestionSettingsType,
  FormQuestionType,
} from '@/lib/types/form'
import {
  createFormTemplateQuestion,
  createFormTemplateQuestionOption,
  deleteFormTemplateQuestion,
  deleteFormTemplateQuestionOption,
  updateFormTemplateQuestion,
  updateFormTemplateQuestionDefaultOptions,
  updateFormTemplateQuestionOption,
  updateFormTemplateQuestionSettings,
} from '@/lib/actions/form'
import { useFormContext } from '@/contexts/form-context'

interface CreateFormQuestionProps {
  newFormQuestion: Partial<FormQuestionType>
}

interface CreateFormQuestionResponse {
  error?: string
}

interface UpdateFormQuestionProps {
  updatedFormQuestion: Partial<FormQuestionType>
}

interface UpdateFormQuestionResponse {
  error?: string
}

interface DeleteFormQuestionProps {
  formQuestionID: number
}

interface DeleteFormQuestionResponse {
  error?: string
}

interface UpdateFormQuestionSettingsProps {
  updatedFormQuestionSettings: Partial<FormQuestionSettingsType>
}

interface UpdateFormQuestionSettingsResponse {
  error?: string
}

interface CreateFormQuestionOptionProps {
  newFormQuestionOption: Partial<FormQuestionOptionType>
}

interface CreateFormQuestionOptionResponse {
  error?: string
}

interface UpdateFormQuestionOptionProps {
  updatedFormQuestionOption: Partial<FormQuestionOptionType>
}

interface UpdateFormQuestionOptionResponse {
  error?: string
}

interface DeleteFormQuestionOptionProps {
  formQuestionOptionID: number
}

interface DeleteFormQuestionOptionResponse {
  error?: string
}

interface UpdateFormQuestionDefaultOptionsProps {
  formQuestionID: number
  updatedFormQuestionDefaultOptions: Partial<FormQuestionDefaultOptionType>[]
}

interface UpdateFormQuestionDefaultOptionsResponse {
  error?: string
}

export default function useQuestionActions() {
  const { selectedFormSectionQuestions, setSelectedFormSectionQuestions } = useFormContext()

  async function createFormQuestion({
    newFormQuestion,
  }: CreateFormQuestionProps): Promise<CreateFormQuestionResponse> {
    const { formQuestions, error } = await createFormTemplateQuestion({
      formQuestion: newFormQuestion,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function updateFormQuestion({
    updatedFormQuestion,
  }: UpdateFormQuestionProps): Promise<UpdateFormQuestionResponse> {
    const { formQuestions, error } = await updateFormTemplateQuestion({
      updatedFormQuestion,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function deleteFormQuestion({
    formQuestionID,
  }: DeleteFormQuestionProps): Promise<DeleteFormQuestionResponse> {
    const { formQuestions, error } = await deleteFormTemplateQuestion({
      formQuestionID,
    })
    if (!error) {
      setSelectedFormSectionQuestions(formQuestions || [])
    }
    return { error }
  }

  async function updateFormQuestionSettings({
    updatedFormQuestionSettings,
  }: UpdateFormQuestionSettingsProps): Promise<UpdateFormQuestionSettingsResponse> {
    const { formQuestionSettings, error } = await updateFormTemplateQuestionSettings({
      updatedFormQuestionSettings,
    })
    if (formQuestionSettings) {
      const updatedFormQuestions = selectedFormSectionQuestions?.map((question) => {
        if (question.formQuestionID === updatedFormQuestionSettings.formQuestionID) {
          return { ...question, formQuestionSettings }
        }
        return question
      })
      setSelectedFormSectionQuestions(updatedFormQuestions || [])
    }
    return { error }
  }

  async function createFormQuestionOption({
    newFormQuestionOption,
  }: CreateFormQuestionOptionProps): Promise<CreateFormQuestionOptionResponse> {
    const { formQuestionOptions, error } = await createFormTemplateQuestionOption({
      formQuestionOption: newFormQuestionOption,
    })
    if (!error) {
      const updatedFormQuestions = selectedFormSectionQuestions?.map((question) => {
        if (question.formQuestionID === newFormQuestionOption.formQuestionID) {
          return { ...question, formQuestionOptions: formQuestionOptions || [] }
        }
        return question
      })
      setSelectedFormSectionQuestions(updatedFormQuestions || [])
    }
    return { error }
  }

  async function updateFormQuestionOption({
    updatedFormQuestionOption,
  }: UpdateFormQuestionOptionProps): Promise<UpdateFormQuestionOptionResponse> {
    const { formQuestionOptions, error } = await updateFormTemplateQuestionOption({
      updatedFormQuestionOption,
    })
    if (!error) {
      const updatedFormQuestions = selectedFormSectionQuestions?.map((question) => {
        if (question.formQuestionID === updatedFormQuestionOption.formQuestionID) {
          return { ...question, formQuestionOptions: formQuestionOptions || [] }
        }
        return question
      })
      setSelectedFormSectionQuestions(updatedFormQuestions || [])
    }
    return { error }
  }

  async function deleteFormQuestionOption({
    formQuestionOptionID,
  }: DeleteFormQuestionOptionProps): Promise<DeleteFormQuestionOptionResponse> {
    const { formQuestionOptions, error } = await deleteFormTemplateQuestionOption({
      formQuestionOptionID,
    })
    if (!error) {
      const updatedFormQuestions = selectedFormSectionQuestions?.map((question) => {
        if (
          question.formQuestionOptions?.some(
            (option) => option.formQuestionOptionID === formQuestionOptionID
          )
        ) {
          return { ...question, formQuestionOptions: formQuestionOptions || [] }
        }
        return question
      })
      setSelectedFormSectionQuestions(updatedFormQuestions || [])
    }
    return { error }
  }

  async function updateFormQuestionDefaultOptions({
    formQuestionID,
    updatedFormQuestionDefaultOptions,
  }: UpdateFormQuestionDefaultOptionsProps): Promise<UpdateFormQuestionDefaultOptionsResponse> {
    const { formQuestionDefaultOptions, error } = await updateFormTemplateQuestionDefaultOptions({
      formQuestionID,
      updatedFormQuestionDefaultOptions,
    })
    if (!error) {
      const updatedFormQuestions = selectedFormSectionQuestions?.map((question) => {
        if (question.formQuestionID === formQuestionID) {
          return { ...question, formQuestionDefaultOptions: formQuestionDefaultOptions || [] }
        }
        return question
      })
      setSelectedFormSectionQuestions(updatedFormQuestions || [])
    }
    return { error }
  }

  return {
    createFormQuestion,
    deleteFormQuestion,
    updateFormQuestion,
    updateFormQuestionSettings,
    createFormQuestionOption,
    updateFormQuestionOption,
    deleteFormQuestionOption,
    updateFormQuestionDefaultOptions,
  }
}
