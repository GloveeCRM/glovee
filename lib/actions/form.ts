'use server'

import { revalidatePath } from 'next/cache'

import {
  FormQuestionSetType,
  FormCategoryType,
  FormSectionType,
  FormTemplateType,
  FormQuestionType,
  FormQuestionSettingsType,
  FormQuestionOptionType,
  FormQuestionDefaultOptionType,
  FormAnswerType,
  ApplicationFormStatusTypes,
  FormType,
} from '@/lib/types/form'
import { GLOVEE_POSTGREST_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '@/lib/utils/server'
import { httpRequest } from '@/lib/utils/http'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '@/lib/utils/json'

interface CreateFormTemplateProps {
  formName: string
  formDescription?: string
}

interface CreateFormTemplateResponse {
  formTemplate?: FormTemplateType
  error?: string
}

export async function createFormTemplate({
  formName,
  formDescription,
}: CreateFormTemplateProps): Promise<CreateFormTemplateResponse> {
  const { data, error } = await httpRequest<{ formTemplate: FormTemplateType }>({
    path: 'rpc/create_form_template',
    method: 'POST',
    data: { formName, formDescription },
    authRequired: true,
  })

  revalidatePath('/admin/form-templates')
  return { formTemplate: data?.formTemplate, error }
}

interface UpdateFormProps {
  form: Partial<FormType>
}

interface UpdateFormResponse {
  form?: FormType
  error?: string
}

export async function updateForm({ form }: UpdateFormProps): Promise<UpdateFormResponse> {
  const { data, error } = await httpRequest<{ form: FormType }>({
    path: 'rpc/update_form',
    method: 'POST',
    data: {
      formID: form.formID,
      formName: form.formName,
      formDescription: form.formDescription,
    },
    authRequired: true,
  })

  return { form: data?.form, error }
}

interface DeleteFormTemplateProps {
  formTemplateID: number
}

interface DeleteFormTemplateResponse {
  error?: string
}

export async function deleteFormTemplate({
  formTemplateID,
}: DeleteFormTemplateProps): Promise<DeleteFormTemplateResponse> {
  const { error } = await httpRequest<{ success: boolean }>({
    path: 'rpc/delete_form_template',
    method: 'POST',
    data: { formTemplateID },
    authRequired: true,
  })

  revalidatePath('/admin/form-templates')
  return { error }
}

interface CreateFormTemplateCategoryProps {
  formTemplateID: number
  categoryName: string
  categoryPosition: number
}

interface CreateFormTemplateCategoryResponse {
  formCategory?: FormCategoryType
  error?: string
}

export async function createFormTemplateCategory({
  formTemplateID,
  categoryName,
  categoryPosition,
}: CreateFormTemplateCategoryProps): Promise<CreateFormTemplateCategoryResponse> {
  const { data, error } = await httpRequest<{ formCategory: FormCategoryType }>({
    path: 'rpc/create_form_template_category',
    method: 'POST',
    data: { formTemplateID, categoryName, categoryPosition },
    authRequired: true,
  })

  revalidatePath(`/admin/template/${formTemplateID}`)
  return { formCategory: data?.formCategory, error }
}

interface UpdateFormTemplateCategoriesProps {
  formCategories: Partial<FormCategoryType>[]
}

interface UpdateFormTemplateCategoriesResponse {
  formCategories?: FormCategoryType[]
  error?: string
}

export async function updateFormTemplateCategories({
  formCategories,
}: UpdateFormTemplateCategoriesProps): Promise<UpdateFormTemplateCategoriesResponse> {
  const { data, error } = await httpRequest<{ formCategories: FormCategoryType[] }>({
    path: 'rpc/update_form_template_categories',
    method: 'POST',
    data: {
      formCategories,
    },
    authRequired: true,
  })

  return { formCategories: data?.formCategories, error }
}

interface DeleteFormTemplateCategoryProps {
  formCategoryID: number
}

interface DeleteFormTemplateCategoryResponse {
  formCategories?: FormCategoryType[]
  error?: string
}

export async function deleteFormTemplateCategory({
  formCategoryID,
}: DeleteFormTemplateCategoryProps): Promise<DeleteFormTemplateCategoryResponse> {
  const { data, error } = await httpRequest<{ formCategories: FormCategoryType[] }>({
    path: 'rpc/delete_form_template_category',
    method: 'POST',
    data: { formCategoryID },
    authRequired: true,
  })

  return { formCategories: data?.formCategories, error }
}

interface CreateFormSectionProps {
  formCategoryID: number
  sectionName: string
  sectionPosition: number
}

interface CreateFormSectionResponse {
  formSection?: FormSectionType
  error?: string
}

export async function createFormSection({
  formCategoryID,
  sectionName,
  sectionPosition,
}: CreateFormSectionProps): Promise<CreateFormSectionResponse> {
  const { data, error } = await httpRequest<{ formSection: FormSectionType }>({
    path: 'rpc/create_form_section',
    method: 'POST',
    data: { formCategoryID, sectionName, sectionPosition },
    authRequired: true,
  })

  return { formSection: data?.formSection, error }
}

interface UpdateFormTemplateSectionsProps {
  formSections: Partial<FormSectionType>[]
}

interface UpdateFormTemplateSectionsResponse {
  formSections?: FormSectionType[]
  error?: string
}

export async function updateFormTemplateSections({
  formSections,
}: UpdateFormTemplateSectionsProps): Promise<UpdateFormTemplateSectionsResponse> {
  const { data, error } = await httpRequest<{ formSections: FormSectionType[] }>({
    path: 'rpc/update_form_template_sections',
    method: 'POST',
    data: { formSections },
    authRequired: true,
  })

  return { formSections: data?.formSections, error }
}

interface DeleteFormTemplateSectionProps {
  formSectionID: number
}

interface DeleteFormTemplateSectionResponse {
  formSections?: FormSectionType[]
  error?: string
}

export async function deleteFormTemplateSection({
  formSectionID,
}: DeleteFormTemplateSectionProps): Promise<DeleteFormTemplateSectionResponse> {
  const { data, error } = await httpRequest<{ formSections: FormSectionType[] }>({
    path: 'rpc/delete_form_template_section',
    method: 'POST',
    data: { formSectionID },
    authRequired: true,
  })

  return { formSections: data?.formSections, error }
}

interface CreateFormTemplateQuestionSetProps {
  formQuestionSet: Partial<FormQuestionSetType>
}

interface CreateFormTemplateQuestionSetResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function createFormTemplateQuestionSet({
  formQuestionSet,
}: CreateFormTemplateQuestionSetProps): Promise<CreateFormTemplateQuestionSetResponse> {
  const { data, error } = await httpRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: 'rpc/create_form_template_question_set',
    method: 'POST',
    data: {
      formSectionID: formQuestionSet.formSectionID,
      formQuestionSetType: formQuestionSet.formQuestionSetType,
      formQuestionSetPosition: formQuestionSet.formQuestionSetPosition,
      dependsOnOptionID: formQuestionSet.dependsOnOptionID || null,
      parentFormQuestionSetID: formQuestionSet.parentFormQuestionSetID || null,
    },
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
}

interface DeleteFormTemplateQuestionSetProps {
  formQuestionSetID: number
}

interface DeleteFormTemplateQuestionSetResponse {
  formQuestionSets?: FormQuestionSetType[]
  error?: string
}

export async function deleteFormTemplateQuestionSet({
  formQuestionSetID,
}: DeleteFormTemplateQuestionSetProps): Promise<DeleteFormTemplateQuestionSetResponse> {
  const { data, error } = await httpRequest<{ formQuestionSets: FormQuestionSetType[] }>({
    path: 'rpc/delete_form_template_question_set',
    method: 'POST',
    data: { formQuestionSetID },
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, error }
}

interface CreateFormTemplateQuestionProps {
  formQuestion: Partial<FormQuestionType>
}

interface CreateFormTemplateQuestionResponse {
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function createFormTemplateQuestion({
  formQuestion,
}: CreateFormTemplateQuestionProps): Promise<CreateFormTemplateQuestionResponse> {
  const { data, error } = await httpRequest<{ formQuestions: FormQuestionType[] }>({
    path: 'rpc/create_form_template_question',
    method: 'POST',
    data: {
      formQuestionSetID: formQuestion.formQuestionSetID,
      formQuestionPrompt: formQuestion.formQuestionPrompt,
      formQuestionType: formQuestion.formQuestionType,
      formQuestionPosition: formQuestion.formQuestionPosition,
      formQuestionSettings: formQuestion.formQuestionSettings,
      formQuestionOptions: formQuestion.formQuestionOptions,
    },
    authRequired: true,
  })

  return { formQuestions: data?.formQuestions, error }
}

interface DeleteFormTemplateQuestionProps {
  formQuestionID: number
}

interface DeleteFormTemplateQuestionResponse {
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function deleteFormTemplateQuestion({
  formQuestionID,
}: DeleteFormTemplateQuestionProps): Promise<DeleteFormTemplateQuestionResponse> {
  const { data, error } = await httpRequest<{ formQuestions: FormQuestionType[] }>({
    path: 'rpc/delete_form_template_question',
    method: 'POST',
    data: { formQuestionID },
    authRequired: true,
  })

  return { formQuestions: data?.formQuestions, error }
}

interface UpdateFormTemplateQuestionProps {
  updatedFormQuestion: Partial<FormQuestionType>
}

interface UpdateFormTemplateQuestionResponse {
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function updateFormTemplateQuestion({
  updatedFormQuestion,
}: UpdateFormTemplateQuestionProps): Promise<UpdateFormTemplateQuestionResponse> {
  const { data, error } = await httpRequest<{ formQuestions: FormQuestionType[] }>({
    path: 'rpc/update_form_template_question',
    method: 'POST',
    data: { updatedFormQuestion },
    authRequired: true,
  })

  return { formQuestions: data?.formQuestions, error }
}

interface UpdateFormTemplateQuestionSettingsProps {
  updatedFormQuestionSettings: Partial<FormQuestionSettingsType>
}

interface UpdateFormTemplateQuestionSettingsResponse {
  formQuestionSettings?: FormQuestionSettingsType
  error?: string
}

export async function updateFormTemplateQuestionSettings({
  updatedFormQuestionSettings,
}: UpdateFormTemplateQuestionSettingsProps): Promise<UpdateFormTemplateQuestionSettingsResponse> {
  const { data, error } = await httpRequest<{
    formQuestionSettings: FormQuestionSettingsType
  }>({
    path: 'rpc/update_form_template_question_settings',
    method: 'POST',
    data: { updatedFormQuestionSettings },
    authRequired: true,
  })

  return { formQuestionSettings: data?.formQuestionSettings, error }
}

interface CreateFormTemplateQuestionOptionProps {
  formQuestionOption: Partial<FormQuestionOptionType>
}

interface CreateFormTemplateQuestionOptionResponse {
  formQuestionOptions?: FormQuestionOptionType[]
  error?: string
}

export async function createFormTemplateQuestionOption({
  formQuestionOption,
}: CreateFormTemplateQuestionOptionProps): Promise<CreateFormTemplateQuestionOptionResponse> {
  const { data, error } = await httpRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
    path: 'rpc/create_form_template_question_option',
    method: 'POST',
    data: { formQuestionOption },
    authRequired: true,
  })

  return { formQuestionOptions: data?.formQuestionOptions, error }
}

interface UpdateFormTemplateQuestionOptionProps {
  updatedFormQuestionOption: Partial<FormQuestionOptionType>
}

interface UpdateFormTemplateQuestionOptionResponse {
  formQuestionOptions?: FormQuestionOptionType[]
  error?: string
}

export async function updateFormTemplateQuestionOption({
  updatedFormQuestionOption,
}: UpdateFormTemplateQuestionOptionProps): Promise<UpdateFormTemplateQuestionOptionResponse> {
  const { data, error } = await httpRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
    path: 'rpc/update_form_template_question_option',
    method: 'POST',
    data: { updatedFormQuestionOption },
    authRequired: true,
  })

  return { formQuestionOptions: data?.formQuestionOptions, error }
}

interface DeleteFormTemplateQuestionOptionProps {
  formQuestionOptionID: number
}

interface DeleteFormTemplateQuestionOptionResponse {
  formQuestionOptions?: FormQuestionOptionType[]
  error?: string
}

export async function deleteFormTemplateQuestionOption({
  formQuestionOptionID,
}: DeleteFormTemplateQuestionOptionProps): Promise<DeleteFormTemplateQuestionOptionResponse> {
  const { data, error } = await httpRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
    path: 'rpc/delete_form_template_question_option',
    method: 'POST',
    data: { formQuestionOptionID },
    authRequired: true,
  })

  return { formQuestionOptions: data?.formQuestionOptions, error }
}

interface UpdateFormTemplateQuestionDefaultOptionsProps {
  formQuestionID: number
  updatedFormQuestionDefaultOptions: Partial<FormQuestionDefaultOptionType>[]
}

interface UpdateFormTemplateQuestionDefaultOptionsResponse {
  formQuestionDefaultOptions?: FormQuestionDefaultOptionType[]
  error?: string
}

export async function updateFormTemplateQuestionDefaultOptions({
  formQuestionID,
  updatedFormQuestionDefaultOptions,
}: UpdateFormTemplateQuestionDefaultOptionsProps): Promise<UpdateFormTemplateQuestionDefaultOptionsResponse> {
  const { data, error } = await httpRequest<{
    formQuestionDefaultOptions: FormQuestionDefaultOptionType[]
  }>({
    path: 'rpc/update_form_template_question_default_options',
    method: 'POST',
    data: { formQuestionID, updatedFormQuestionDefaultOptions },
    authRequired: true,
  })

  return { formQuestionDefaultOptions: data?.formQuestionDefaultOptions, error }
}

interface CreateApplicationFormProps {
  applicationID: number
  formTemplateID: number
  formName: string
}

interface CreateApplicationFormResponse {
  applicationFormID?: number
  error?: string
}

export async function createApplicationForm({
  applicationID,
  formTemplateID,
  formName,
}: CreateApplicationFormProps): Promise<CreateApplicationFormResponse> {
  const { data, error } = await httpRequest<{ applicationFormID: number }>({
    path: 'rpc/create_application_form',
    method: 'POST',
    data: {
      applicationID,
      formTemplateID,
      formName,
    },
    authRequired: true,
  })

  revalidatePath(`/admin/application/${applicationID}`)
  return { applicationFormID: data?.applicationFormID, error }
}

interface UpsertFormAnswerProps {
  formAnswer: Partial<FormAnswerType>
}

interface UpsertFormAnswerResponse {
  formAnswer?: FormAnswerType
  error?: string
}

export async function upsertFormAnswer({
  formAnswer,
}: UpsertFormAnswerProps): Promise<UpsertFormAnswerResponse> {
  const { data, error } = await httpRequest<{ formAnswer: FormAnswerType }>({
    path: 'rpc/upsert_form_answer',
    method: 'POST',
    data: {
      formQuestionID: formAnswer.formQuestionID,
      answerText: formAnswer.answerText,
      answerDate: formAnswer.answerDate,
      answerFiles: formAnswer.answerFiles,
      answerOptions: formAnswer.answerOptions,
    },
    authRequired: true,
  })

  return { formAnswer: data?.formAnswer, error }
}

interface RepeatApplicationFormQuestionSetProps {
  formQuestionSetID: number
}

interface RepeatApplicationFormQuestionSetResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function repeatApplicationFormQuestionSet({
  formQuestionSetID,
}: RepeatApplicationFormQuestionSetProps): Promise<RepeatApplicationFormQuestionSetResponse> {
  const { data, error } = await httpRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: 'rpc/repeat_application_form_question_set',
    method: 'POST',
    data: { formQuestionSetID },
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
}

interface DeleteApplicationFormQuestionSetProps {
  formQuestionSetID: number
}

interface DeleteApplicationFormQuestionSetResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function deleteApplicationFormQuestionSet({
  formQuestionSetID,
}: DeleteApplicationFormQuestionSetProps): Promise<DeleteApplicationFormQuestionSetResponse> {
  const { data, error } = await httpRequest<{
    formQuestionSets: FormQuestionSetType[]
    formQuestions: FormQuestionType[]
  }>({
    path: 'rpc/delete_application_form_question_set',
    method: 'POST',
    data: { formQuestionSetID },
    authRequired: true,
  })

  return { formQuestionSets: data?.formQuestionSets, formQuestions: data?.formQuestions, error }
}

interface UpdateApplicationFormStatusProps {
  applicationFormID: number
  status: ApplicationFormStatusTypes
}

interface UpdateApplicationFormStatusResponse {
  status?: ApplicationFormStatusTypes
  error?: string
}

export async function updateApplicationFormStatus({
  applicationFormID,
  status,
}: UpdateApplicationFormStatusProps): Promise<UpdateApplicationFormStatusResponse> {
  const { data, error } = await httpRequest<{ status: ApplicationFormStatusTypes }>({
    path: 'rpc/update_application_form_status',
    method: 'POST',
    data: { applicationFormID, status },
    authRequired: true,
  })

  revalidatePath(`/application`)
  return { status: data?.status, error }
}

interface UpdateFormSectionInputDTO {
  userID: number
  formSections: Partial<FormSectionType>[]
}

type UpdateFormSectionOutputDTO = {
  error?: string
  success?: string
  formSections?: FormSectionType[]
}

export async function updateFormSections({
  userID,
  formSections,
}: UpdateFormSectionInputDTO): Promise<UpdateFormSectionOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSections,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_POSTGREST_URL}/v1/${orgName}/form/section/update?${queryParams}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)
    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form section updated!', formSections: camelData.data.formSections }
    }
  } catch (error) {
    return { error: 'Failed to update form section!' }
  }
}

interface DeleteFormSectionInputDTO {
  userID: number
  formSectionIDs: number[]
}

type DeleteFormSectionOutputDTO = {
  error?: string
  success?: string
}

export async function deleteFormSections({
  userID,
  formSectionIDs,
}: DeleteFormSectionInputDTO): Promise<DeleteFormSectionOutputDTO> {
  const accessToken = await getSession()
  if (!accessToken) {
    return { error: 'Unauthorized' }
  }

  const orgName = getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSectionIDs,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_POSTGREST_URL}/v1/${orgName}/form/section/delete?${queryParams}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodySnakeCase),
      }
    )

    const data = await response.json()
    const camelData = keysSnakeCaseToCamelCase(data)

    if (data.status === 'error') {
      return { error: camelData.error }
    } else {
      revalidatePath('/admin/template')
      return { success: 'Form section deleted!' }
    }
  } catch (error) {
    console.error('error', error)
    return { error: 'Failed to delete form section!' }
  }
}
