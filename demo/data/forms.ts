import {
  FormQuestionSetType,
  ApplicationFormStatusTypes,
  FormCategoryType,
  FormSectionType,
  FormTemplateType,
  FormQuestionType,
  FormQuestionSettingsType,
  FormType,
} from '@/lib/types/form'

// Helper functions to work with localStorage
const getStorageItem = <T>(key: string): T[] => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : []
}

const setStorageItem = <T>(key: string, value: T[]): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

// Storage keys
const STORAGE_KEYS = {
  templates: 'formTemplates',
  forms: 'forms',
  categories: 'formCategories',
  sections: 'formSections',
  questionSets: 'formQuestionSets',
  questions: 'formQuestions',
  questionSettings: 'formQuestionSettings',
}

export async function updateFormTemplate({
  formTemplate,
}: {
  formTemplate: Partial<FormTemplateType>
}): Promise<{ formTemplate?: FormTemplateType; error?: string }> {
  try {
    const templates = getStorageItem<FormTemplateType>(STORAGE_KEYS.templates)
    const index = templates.findIndex((t) => t.formTemplateID === formTemplate.formTemplateID)
    if (index === -1) return { error: 'Template not found' }

    templates[index] = {
      ...templates[index],
      ...formTemplate,
    }
    setStorageItem(STORAGE_KEYS.templates, templates)
    return { formTemplate: templates[index] }
  } catch (e) {
    return { error: 'Failed to update template' }
  }
}
export async function updateFormTemplateCategories({
  formCategories,
}: {
  formCategories: Partial<FormCategoryType>[]
}): Promise<{ formCategories?: FormCategoryType[]; error?: string }> {
  try {
    const categories = getStorageItem<FormCategoryType>(STORAGE_KEYS.categories)
    const updatedCategories = categories.map((cat) => {
      const update = formCategories.find((fc) => fc.formCategoryID === cat.formCategoryID)
      if (update) {
        return {
          ...cat,
          ...update,
          updatedAt: new Date().toISOString(),
        }
      }
      return cat
    })
    setStorageItem(STORAGE_KEYS.categories, updatedCategories)
    return { formCategories: updatedCategories }
  } catch (e) {
    return { error: 'Failed to update categories' }
  }
}

export async function deleteFormTemplateCategory({
  formCategoryID,
}: {
  formCategoryID: number
}): Promise<{ formCategories?: FormCategoryType[]; error?: string }> {
  try {
    const categories = getStorageItem<FormCategoryType>(STORAGE_KEYS.categories)
    const updatedCategories = categories.filter((c) => c.formCategoryID !== formCategoryID)
    setStorageItem(STORAGE_KEYS.categories, updatedCategories)

    // Clean up related sections
    const sections = getStorageItem<FormSectionType>(STORAGE_KEYS.sections)
    setStorageItem(
      STORAGE_KEYS.sections,
      sections.filter((s) => s.formCategoryID !== formCategoryID)
    )
    return { formCategories: updatedCategories }
  } catch (e) {
    return { error: 'Failed to delete category' }
  }
}

export async function createFormSection({
  formCategoryID,
  sectionName,
  sectionPosition,
}: {
  formCategoryID: number
  sectionName: string
  sectionPosition: number
}): Promise<{ formSection?: FormSectionType; error?: string }> {
  try {
    const sections = getStorageItem<FormSectionType>(STORAGE_KEYS.sections)
    const newSection: FormSectionType = {
      formSectionID: Date.now(),
      formCategoryID,
      sectionName,
      sectionPosition,
      createdAt: new Date().toISOString(),
      completionRate: 0,
    }
    sections.push(newSection)
    setStorageItem(STORAGE_KEYS.sections, sections)
    return { formSection: newSection }
  } catch (e) {
    return { error: 'Failed to create section' }
  }
}

export async function updateFormTemplateSections({
  formSections,
}: {
  formSections: Partial<FormSectionType>[]
}): Promise<{ formSections?: FormSectionType[]; error?: string }> {
  try {
    const sections = getStorageItem<FormSectionType>(STORAGE_KEYS.sections)
    const updatedSections = sections.map((section) => {
      const update = formSections.find((fs) => fs.formSectionID === section.formSectionID)
      if (update) {
        return {
          ...section,
          ...update,
          updatedAt: new Date().toISOString(),
        }
      }
      return section
    })
    setStorageItem(STORAGE_KEYS.sections, updatedSections)
    return { formSections: updatedSections }
  } catch (e) {
    return { error: 'Failed to update sections' }
  }
}

export async function deleteFormTemplateSection({
  formSectionID,
}: {
  formSectionID: number
}): Promise<{ formSections?: FormSectionType[]; error?: string }> {
  try {
    const sections = getStorageItem<FormSectionType>(STORAGE_KEYS.sections)
    const updatedSections = sections.filter((s) => s.formSectionID !== formSectionID)
    setStorageItem(STORAGE_KEYS.sections, updatedSections)

    // Clean up related question sets
    const questionSets = getStorageItem<FormQuestionSetType>(STORAGE_KEYS.questionSets)
    setStorageItem(
      STORAGE_KEYS.questionSets,
      questionSets.filter((qs) => qs.formSectionID !== formSectionID)
    )
    return { formSections: updatedSections }
  } catch (e) {
    return { error: 'Failed to delete section' }
  }
}

export async function createFormTemplateQuestionSet({
  formQuestionSet,
}: {
  formQuestionSet: Partial<FormQuestionSetType>
}): Promise<{ formQuestionSets?: FormQuestionSetType[]; error?: string }> {
  try {
    const questionSets = getStorageItem<FormQuestionSetType>(STORAGE_KEYS.questionSets)
    const newQuestionSet: FormQuestionSetType = {
      formQuestionSetID: Date.now(),
      ...formQuestionSet,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as FormQuestionSetType
    questionSets.push(newQuestionSet)
    setStorageItem(STORAGE_KEYS.questionSets, questionSets)
    return { formQuestionSets: questionSets }
  } catch (e) {
    return { error: 'Failed to create question set' }
  }
}

export async function deleteFormTemplateQuestionSet({
  formQuestionSetID,
}: {
  formQuestionSetID: number
}): Promise<{ formQuestionSets?: FormQuestionSetType[]; error?: string }> {
  try {
    const questionSets = getStorageItem<FormQuestionSetType>(STORAGE_KEYS.questionSets)
    const updatedQuestionSets = questionSets.filter(
      (qs) => qs.formQuestionSetID !== formQuestionSetID
    )
    setStorageItem(STORAGE_KEYS.questionSets, updatedQuestionSets)

    // Clean up related questions
    const questions = getStorageItem<FormQuestionType>(STORAGE_KEYS.questions)
    setStorageItem(
      STORAGE_KEYS.questions,
      questions.filter((q) => q.formQuestionSetID !== formQuestionSetID)
    )
    return { formQuestionSets: updatedQuestionSets }
  } catch (e) {
    return { error: 'Failed to delete question set' }
  }
}

export async function createFormTemplateQuestion({
  formQuestion,
}: {
  formQuestion: Partial<FormQuestionType>
}): Promise<{ formQuestions?: FormQuestionType[]; error?: string }> {
  try {
    const questions = getStorageItem<FormQuestionType>(STORAGE_KEYS.questions)
    const newQuestion: FormQuestionType = {
      formQuestionID: Date.now(),
      ...formQuestion,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as FormQuestionType
    questions.push(newQuestion)
    setStorageItem(STORAGE_KEYS.questions, questions)
    return { formQuestions: questions }
  } catch (e) {
    return { error: 'Failed to create question' }
  }
}

export async function deleteFormTemplateQuestion({
  formQuestionID,
}: {
  formQuestionID: number
}): Promise<{ formQuestions?: FormQuestionType[]; error?: string }> {
  try {
    const questions = getStorageItem<FormQuestionType>(STORAGE_KEYS.questions)
    const updatedQuestions = questions.filter((q) => q.formQuestionID !== formQuestionID)
    setStorageItem(STORAGE_KEYS.questions, updatedQuestions)
    return { formQuestions: updatedQuestions }
  } catch (e) {
    return { error: 'Failed to delete question' }
  }
}

export async function updateFormTemplateQuestion({
  updatedFormQuestion,
}: {
  updatedFormQuestion: Partial<FormQuestionType>
}): Promise<{ formQuestions?: FormQuestionType[]; error?: string }> {
  try {
    const questions = getStorageItem<FormQuestionType>(STORAGE_KEYS.questions)
    const updatedQuestions = questions.map((question) => {
      if (question.formQuestionID === updatedFormQuestion.formQuestionID) {
        return {
          ...question,
          ...updatedFormQuestion,
          updatedAt: new Date().toISOString(),
        }
      }
      return question
    })
    setStorageItem(STORAGE_KEYS.questions, updatedQuestions)
    return { formQuestions: updatedQuestions }
  } catch (e) {
    return { error: 'Failed to update question' }
  }
}

export async function updateFormTemplateQuestionSettings({
  updatedFormQuestionSettings,
}: {
  updatedFormQuestionSettings: Partial<FormQuestionSettingsType>
}): Promise<{ formQuestionSettings?: FormQuestionSettingsType; error?: string }> {
  try {
    const settings = getStorageItem<FormQuestionSettingsType>(STORAGE_KEYS.questionSettings)
    const updatedSettings = settings.map((setting) => {
      if (setting.formQuestionID === updatedFormQuestionSettings.formQuestionID) {
        return {
          ...setting,
          ...updatedFormQuestionSettings,
          updatedAt: new Date().toISOString(),
        }
      }
      return setting
    })
    setStorageItem(STORAGE_KEYS.questionSettings, updatedSettings)
    return { formQuestionSettings: updatedSettings[0] }
  } catch (e) {
    return { error: 'Failed to update question settings' }
  }
}

interface SearchFormTemplatesFilters {
  formTemplateID?: number
}

interface SearchFormTemplatesProps {
  filters?: SearchFormTemplatesFilters
  limit?: number
  offset?: number
}

interface SearchFormTemplatesResponse {
  formTemplates?: FormTemplateType[]
  totalCount: number
  error?: string
}

export async function searchFormTemplates({
  filters,
  limit,
  offset,
}: SearchFormTemplatesProps): Promise<SearchFormTemplatesResponse> {
  try {
    let templates = getStorageItem<FormTemplateType>(STORAGE_KEYS.templates)

    // Apply filters
    if (filters?.formTemplateID) {
      templates = templates.filter((t) => t.formTemplateID === filters.formTemplateID)
    }

    const totalCount = templates.length

    // Apply pagination
    if (limit || offset) {
      const startIndex = offset || 0
      const endIndex = limit ? startIndex + limit : undefined
      templates = templates.slice(startIndex, endIndex)
    }

    return { formTemplates: templates, totalCount }
  } catch (e) {
    return { error: 'Failed to search templates', totalCount: 0 }
  }
}

interface FetchFormTemplateWithCategoriesAndSectionsProps {
  formTemplateID: number
}

interface FetchFormTemplateWithCategoriesAndSectionsResponse {
  formTemplate?: FormTemplateType
  formCategories?: FormCategoryType[]
  formSections?: FormSectionType[]
  error?: string
}

export async function fetchFormTemplateWithCategoriesAndSections({
  formTemplateID,
}: FetchFormTemplateWithCategoriesAndSectionsProps): Promise<FetchFormTemplateWithCategoriesAndSectionsResponse> {
  try {
    // Get template
    const templates = getStorageItem<FormTemplateType>(STORAGE_KEYS.templates)
    const formTemplate = templates.find((t) => t.formTemplateID === formTemplateID)
    if (!formTemplate) return { error: 'Template not found' }

    // Get associated form
    const forms = getStorageItem<FormType>(STORAGE_KEYS.forms)
    const form = forms.find((f) => f.formID === formTemplate.formID)
    if (!form) return { error: 'Associated form not found' }

    // Get categories for the form
    const categories = getStorageItem<FormCategoryType>(STORAGE_KEYS.categories)
    const formCategories = categories.filter((c) => c.formID === form.formID)

    // Get sections for all categories
    const sections = getStorageItem<FormSectionType>(STORAGE_KEYS.sections)
    const formSections = sections.filter((s) =>
      formCategories.some((c) => c.formCategoryID === s.formCategoryID)
    )

    return {
      formTemplate,
      formCategories,
      formSections,
    }
  } catch (e) {
    return { error: 'Failed to fetch template with categories and sections' }
  }
}

interface FetchFormTemplateSectionQuestionSetsAndQuestionsProps {
  formSectionID: number
}

interface FetchFormTemplateSectionQuestionSetsAndQuestionsResponse {
  formQuestionSets?: FormQuestionSetType[]
  formQuestions?: FormQuestionType[]
  error?: string
}

export async function fetchFormTemplateSectionQuestionSetsAndQuestions({
  formSectionID,
}: FetchFormTemplateSectionQuestionSetsAndQuestionsProps): Promise<FetchFormTemplateSectionQuestionSetsAndQuestionsResponse> {
  try {
    // Get question sets for the section
    const questionSets = getStorageItem<FormQuestionSetType>(STORAGE_KEYS.questionSets)
    const formQuestionSets = questionSets.filter((qs) => qs.formSectionID === formSectionID)

    // Get questions for all question sets
    const questions = getStorageItem<FormQuestionType>(STORAGE_KEYS.questions)
    const formQuestions = questions.filter((q) =>
      formQuestionSets.some((qs) => qs.formQuestionSetID === q.formQuestionSetID)
    )

    return {
      formQuestionSets,
      formQuestions,
    }
  } catch (e) {
    return { error: 'Failed to fetch section question sets and questions' }
  }
}
