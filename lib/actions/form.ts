'use server'

import { revalidatePath } from 'next/cache'

import { FileType } from '../types/file'
import {
  FormQuestionSetType,
  FormStatusTypes,
  FormCategoryType,
  FormSectionType,
  FormTemplateType,
  FormQuestionType,
  FormQuestionSettingsType,
  FormQuestionOptionType,
  FormQuestionDefaultOptionType,
  ApplicationFormType,
} from '../types/form'
import { GLOVEE_API_URL } from '@/lib/constants/api'
import { getSession } from '@/lib/auth/session'
import { getCurrentOrgName } from '../utils/server'
import { apiRequest } from '../utils/http'
import { keysCamelCaseToSnakeCase, keysSnakeCaseToCamelCase } from '../utils/json'

interface CreateFormTemplateProps {
  templateName: string
}

interface CreateFormTemplateResponse {
  error?: string
}

export async function createFormTemplate({
  templateName,
}: CreateFormTemplateProps): Promise<CreateFormTemplateResponse> {
  const { error } = await apiRequest<{ formTemplate: FormTemplateType }>({
    path: 'rpc/create_form_template',
    method: 'POST',
    data: { templateName },
    authRequired: true,
  })

  revalidatePath('/admin/templates')
  return { error }
}

interface UpdateFormTemplateProps {
  formTemplate: Partial<FormTemplateType>
}

interface UpdateFormTemplateResponse {
  formTemplate?: FormTemplateType
  error?: string
}

export async function updateFormTemplate({
  formTemplate,
}: UpdateFormTemplateProps): Promise<UpdateFormTemplateResponse> {
  const { data, error } = await apiRequest<{ formTemplate: FormTemplateType }>({
    path: 'rpc/update_form_template',
    method: 'POST',
    data: {
      formTemplateID: formTemplate.formTemplateID,
      templateName: formTemplate.templateName,
    },
    authRequired: true,
  })
  revalidatePath(`/admin/template/${formTemplate.formTemplateID}`)
  return { formTemplate: data?.formTemplate, error }
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
  const { error } = await apiRequest<{ success: boolean }>({
    path: 'rpc/delete_form_template',
    method: 'POST',
    data: { formTemplateID },
    authRequired: true,
  })

  revalidatePath('/admin/templates')
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
  const { data, error } = await apiRequest<{ formCategory: FormCategoryType }>({
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
  const { data, error } = await apiRequest<{ formCategories: FormCategoryType[] }>({
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
  const { data, error } = await apiRequest<{ formCategories: FormCategoryType[] }>({
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
  const { data, error } = await apiRequest<{ formSection: FormSectionType }>({
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
  const { data, error } = await apiRequest<{ formSections: FormSectionType[] }>({
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
  const { data, error } = await apiRequest<{ formSections: FormSectionType[] }>({
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
  const { data, error } = await apiRequest<{
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
  const { data, error } = await apiRequest<{ formQuestionSets: FormQuestionSetType[] }>({
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
  const { data, error } = await apiRequest<{ formQuestions: FormQuestionType[] }>({
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
  const { data, error } = await apiRequest<{ formQuestions: FormQuestionType[] }>({
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
  const { data, error } = await apiRequest<{ formQuestions: FormQuestionType[] }>({
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
  const { data, error } = await apiRequest<{
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
  const { data, error } = await apiRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
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
  const { data, error } = await apiRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
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
  const { data, error } = await apiRequest<{ formQuestionOptions: FormQuestionOptionType[] }>({
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
  const { data, error } = await apiRequest<{
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
}

interface CreateApplicationFormResponse {
  applicationForm?: ApplicationFormType
  error?: string
}

export async function createApplicationForm({
  applicationID,
  formTemplateID,
}: CreateApplicationFormProps): Promise<CreateApplicationFormResponse> {
  const { data, error } = await apiRequest<{ applicationForm: ApplicationFormType }>({
    path: 'rpc/create_application_form',
    method: 'POST',
    data: { applicationID, formTemplateID },
    authRequired: true,
  })

  return { applicationForm: data?.applicationForm, error }
}

// interface CreateNewFormProps {
//   ownerID: number
//   role: string
//   templateID: number
// }

// interface CreateNewFormResponse {
//   success?: string
//   error?: string
// }

// export async function createNewForm({
//   ownerID,
//   role,
//   templateID,
// }: CreateNewFormProps): Promise<CreateNewFormResponse> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const body = {
//     ownerID,
//     templateID: templateID || null,
//     role,
//   }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//   try {
//     const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/create`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(bodySnakeCase),
//     })

//     const data = await response.json()

//     if (data.status === 'error') {
//       return { error: data.error }
//     } else {
//       revalidatePath('/admin/applications')
//       return { success: 'Application created!' }
//     }
//   } catch (error) {
//     return { error: 'Failed to create application!' }
//   }
// }

// export async function setFormStatus(
//   formID: number,
//   status: FormStatusTypes,
//   userID: number
// ): Promise<{ success?: string; error?: string }> {
//   try {
//     const accessToken = await getSession()
//     if (!accessToken) {
//       return { error: 'Unauthorized' }
//     }

//     const orgName = await getCurrentOrgName()

//     const queryParams = new URLSearchParams()
//     queryParams.append('user_id', userID?.toString() || '')

//     const body = {
//       formID,
//       status,
//     }
//     const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//     const response = await fetch(`${GLOVEE_API_URL}/v1/${orgName}/form/set-status?${queryParams}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(bodySnakeCase),
//     })

//     const data = await response.json()

//     if (data.status === 'error') {
//       return { error: data.error }
//     } else {
//       revalidatePath('/admin/applications')
//       return { success: 'Application submitted!' }
//     }
//   } catch (error) {
//     return { error: 'Failed to submit form!' }
//   }
// }

// interface SaveAnswerProps {
//   userID: number
//   questionID: number
//   text?: string
//   optionIDs?: number[]
//   date?: string
//   files?: FileType[]
// }

// export async function saveAnswer({
//   userID,
//   questionID,
//   text,
//   optionIDs,
//   date,
//   files,
// }: SaveAnswerProps): Promise<{ success?: string; error?: string; data?: any }> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const body = {
//     questionID,
//     answer: {
//       questionID,
//       text,
//       files,
//       optionIDs,
//       date,
//     },
//   }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//   const queryParams = new URLSearchParams()
//   queryParams.append('user_id', userID?.toString() || '')

//   try {
//     const response = await fetch(
//       `${GLOVEE_API_URL}/v1/${orgName}/form/question/answer?${queryParams}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(bodySnakeCase),
//       }
//     )

//     const data = await response.json()
//     const camelData = keysSnakeCaseToCamelCase(data)
//     if (data.status === 'error') {
//       return { error: camelData.error }
//     } else {
//       revalidatePath('/application')
//       return { success: 'Answer saved!', data: camelData.data }
//     }
//   } catch (error) {
//     return { error: 'Failed to save answer!' }
//   }
// }

// export async function createQuestionSetAndQuestions(
//   userID: number,
//   questionSet: FormQuestionSetType
// ): Promise<{ success?: string; error?: string }> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const queryParams = new URLSearchParams()
//   queryParams.append('user_id', userID?.toString() || '')

//   const body = { questionSet }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)
//   console.log('bodySnakeCase', JSON.stringify(bodySnakeCase, null, 2))
//   try {
//     const response = await fetch(
//       `${GLOVEE_API_URL}/v1/${orgName}/form/question-set/create?${queryParams}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(bodySnakeCase),
//       }
//     )

//     const data = await response.json()
//     const camelData = keysSnakeCaseToCamelCase(data)
//     console.log('camelData', JSON.stringify(camelData, null, 2))
//     if (data.status === 'error') {
//       return { error: camelData.error }
//     } else {
//       revalidatePath('/application')
//       return { success: 'Question set created!' }
//     }
//   } catch (error) {
//     console.error('error', error)
//     return { error: 'Failed to create question set!' }
//   }
// }

// export async function deleteQuestionSet(
//   userID: number,
//   questionSetID: number
// ): Promise<{ success?: string; error?: string }> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const queryParams = new URLSearchParams()
//   queryParams.append('user_id', userID?.toString() || '')
//   queryParams.append('question_set_id', questionSetID?.toString() || '')

//   try {
//     const response = await fetch(
//       `${GLOVEE_API_URL}/v1/${orgName}/form/question-set/delete?${queryParams}`,
//       {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     )

//     const data = await response.json()

//     if (data.status === 'error') {
//       return { error: data.error }
//     } else {
//       revalidatePath('/application')
//       return { success: 'Question set deleted!' }
//     }
//   } catch (error) {
//     return { error: 'Failed to delete question set!' }
//   }
// }

// interface CreateFormCategoryInputDTO {
//   userID: number
//   formCategory: Partial<FormCategoryType>
// }

// type CreateFormCategoryOutputDTO = {
//   error?: string
//   success?: string
//   formCategory?: FormCategoryType
// }

// export async function createFormCategory({
//   userID,
//   formCategory,
// }: CreateFormCategoryInputDTO): Promise<CreateFormCategoryOutputDTO> {
//   const accessToken = await getSession()
//   if (!accessToken) {
//     return { error: 'Unauthorized' }
//   }

//   const orgName = await getCurrentOrgName()

//   const queryParams = new URLSearchParams()
//   queryParams.append('user_id', userID?.toString() || '')

//   const body = {
//     formCategory,
//   }
//   const bodySnakeCase = keysCamelCaseToSnakeCase(body)

//   try {
//     const response = await fetch(
//       `${GLOVEE_API_URL}/v1/${orgName}/form/category/create?${queryParams}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(bodySnakeCase),
//       }
//     )

//     const data = await response.json()
//     const camelData = keysSnakeCaseToCamelCase(data)
//     if (data.status === 'error') {
//       return { error: camelData.error }
//     } else {
//       revalidatePath('/admin/template')
//       return { success: 'Form category created!', formCategory: camelData.data }
//     }
//   } catch (error) {
//     return { error: 'Failed to create form category!' }
//   }
// }

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

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSections,
  }
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/section/update?${queryParams}`,
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
    console.log('body', JSON.stringify(bodySnakeCase, null, 2))
    console.log('camelData', JSON.stringify(camelData, null, 2))
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

  console.log('formSectionIDs', formSectionIDs)

  const orgName = await getCurrentOrgName()

  const queryParams = new URLSearchParams()
  queryParams.append('user_id', userID?.toString() || '')

  const body = {
    formSectionIDs,
  }
  console.log('body', JSON.stringify(body, null, 2))
  const bodySnakeCase = keysCamelCaseToSnakeCase(body)

  try {
    const response = await fetch(
      `${GLOVEE_API_URL}/v1/${orgName}/form/section/delete?${queryParams}`,
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
    console.log('body', JSON.stringify(bodySnakeCase, null, 2))
    console.log('camelData', JSON.stringify(camelData, null, 2))
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
