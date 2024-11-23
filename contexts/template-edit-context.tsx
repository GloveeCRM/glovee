'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { FormCategoryType, FormSectionType, FormTemplateType } from '@/lib/types/form'
import {
  fetchFormTemplateCategories,
  fetchFormTemplateSections,
  searchFormTemplates,
} from '@/lib/data/form'

type FormTemplateEditContextType = {
  formTemplateID: number
  formTemplate: FormTemplateType | null
  setFormTemplate: Dispatch<SetStateAction<FormTemplateType | null>>
  formCategories: FormCategoryType[] | null
  setFormCategories: Dispatch<SetStateAction<FormCategoryType[] | null>>
  selectedFormCategoryID: number
  setSelectedFormCategoryID: Dispatch<SetStateAction<number>>
  formSections: FormSectionType[] | null
  setFormSections: Dispatch<SetStateAction<FormSectionType[] | null>>
  selectedFormSectionID: number
  setSelectedFormSectionID: Dispatch<SetStateAction<number>>
  selectedFormCategorySections: FormSectionType[] | undefined
  // formID: number
  // template: FormType | null
  // setTemplate: Dispatch<SetStateAction<FormType | null>>
  // savedTemplate: FormType | null
  // setSavedTemplate: Dispatch<SetStateAction<FormType | null>>
  // isTemplateChanged: boolean
  // setIsTemplateChanged: Dispatch<SetStateAction<boolean>>
  // selectedCategoryID: number
  // setSelectedCategoryID: Dispatch<SetStateAction<number>>
  // selectedSectionID: number
  // setSelectedSectionID: Dispatch<SetStateAction<number>>
  // selectedQuestionSetID: number
  // setSelectedQuestionSetID: Dispatch<SetStateAction<number>>
  // selectedQuestionID: number
  // setSelectedQuestionID: Dispatch<SetStateAction<number>>
  // formCategories: FormCategoryType[] | null
  // setFormCategories: Dispatch<SetStateAction<FormCategoryType[] | null>>
}

const formTemplateEditContextDefaultValues: FormTemplateEditContextType = {
  formTemplateID: 0,
  formTemplate: null,
  setFormTemplate: () => {},
  formCategories: null,
  setFormCategories: () => {},
  selectedFormCategoryID: 0,
  setSelectedFormCategoryID: () => {},
  formSections: null,
  setFormSections: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormCategorySections: undefined,
  // formID: 0,
  // template: null,
  // setTemplate: () => {},
  // savedTemplate: null,
  // setSavedTemplate: () => {},
  // isTemplateChanged: false,
  // setIsTemplateChanged: () => {},
  // selectedCategoryID: 0,
  // setSelectedCategoryID: () => {},
  // selectedSectionID: 0,
  // setSelectedSectionID: () => {},
  // selectedQuestionSetID: 0,
  // setSelectedQuestionSetID: () => {},
  // selectedQuestionID: 0,
  // setSelectedQuestionID: () => {},
  // formCategories: null,
  // setFormCategories: () => {},
}

const FormTemplateEditContext = createContext<FormTemplateEditContextType>(
  formTemplateEditContextDefaultValues
)

interface FormTemplateEditProviderProps {
  formTemplateID: number
  children: React.ReactNode
}

export default function FormTemplateEditProvider({
  formTemplateID,
  children,
}: FormTemplateEditProviderProps) {
  const [formTemplate, setFormTemplate] = useState<FormTemplateType | null>(null)
  const [formCategories, setFormCategories] = useState<FormCategoryType[] | null>(null)
  const [formSections, setFormSections] = useState<FormSectionType[] | null>(null)
  const [selectedFormCategoryID, setSelectedFormCategoryID] = useState<number>(0)
  const [selectedFormSectionID, setSelectedFormSectionID] = useState<number>(0)

  useEffect(() => {
    async function fetchAndSetFormTemplate() {
      const { formTemplates } = await searchFormTemplates({
        filters: {
          templateID: formTemplateID,
        },
        limit: 1,
      })
      const formTemplate = formTemplates?.[0] || null
      setFormTemplate(formTemplate)
    }

    async function fetchAndSetFormTemplateCategories() {
      const { formCategories } = await fetchFormTemplateCategories({ formTemplateID })
      setFormCategories(formCategories || null)
    }

    async function fetchAndSetFormTemplateSections() {
      const { formSections } = await fetchFormTemplateSections({ formTemplateID })
      setFormSections(formSections || null)
    }

    fetchAndSetFormTemplate()
    fetchAndSetFormTemplateCategories()
    fetchAndSetFormTemplateSections()
  }, [formTemplateID])

  // Set the first category as selected if no category is selected
  useEffect(() => {
    if (formCategories && formCategories.length > 0 && !selectedFormCategoryID) {
      setSelectedFormCategoryID(formCategories[0].formCategoryID)
    }
  }, [formCategories])

  const selectedFormCategorySections = useMemo(() => {
    return formSections?.filter((section) => section.formCategoryID === selectedFormCategoryID)
  }, [formSections, selectedFormCategoryID])

  // Set the selected category's first section when the selected category changes
  useEffect(() => {
    if (selectedFormCategorySections && selectedFormCategorySections.length > 0) {
      setSelectedFormSectionID(selectedFormCategorySections?.[0]?.formSectionID || 0)
    }
  }, [selectedFormCategorySections])

  // const [formCategories, setFormCategories] = useState<FormCategoryType[] | null>(null)
  // const [savedTemplate, setSavedTemplate] = useState<FormType | null>(null)
  // const [selectedCategoryID, setSelectedCategoryID] = useState<number>(
  //   form?.categories?.[0]?.formCategoryID || 0
  // )
  // const [selectedSectionID, setSelectedSectionID] = useState<number>(
  //   form?.categories?.[0]?.sections?.[0]?.id || 0
  // )
  // const [selectedQuestionSetID, setSelectedQuestionSetID] = useState<number>(0)
  // const [selectedQuestionID, setSelectedQuestionID] = useState<number>(0)
  // const [isTemplateChanged, setIsTemplateChanged] = useState<boolean>(false)

  // const { sessionUserID } = useAuthContext()

  // useEffect(() => {
  //   async function fetchAndSetInitialTemplate() {
  //     const fetchedTemplate = await fetchFullTemplateById(orgName, templateID)
  //     setSavedTemplate(fetchedTemplate)

  //     const localTemplate = getTemplateFromLocalStorage(templateID)
  //     if (localTemplate) {
  //       setTemplate(localTemplate)
  //     } else {
  //       setTemplate(fetchedTemplate)
  //     }
  //   }

  //   fetchAndSetInitialTemplate()
  // }, [templateID])

  // useEffect(() => {
  //   if (template) {
  //     setTemplateOnLocalStorage(templateID, template)
  //   }

  //   function setDefaultSelections() {
  //     if (!template || !template.categories) return

  //     if (!selectedCategoryID) {
  //       setSelectedCategoryID(template.categories?.[0]?.id)
  //     }

  //     if (!selectedSectionID && template.categories?.[0]?.sections) {
  //       setSelectedSectionID(template.categories[0].sections[0]?.id || 0)
  //     }
  //   }

  //   setDefaultSelections()

  //   function detectAndSetIsTemplateChanged() {
  //     const currentTemplateStr = JSON.stringify(template)
  //     const savedTemplateStr = JSON.stringify(savedTemplate)
  //     setIsTemplateChanged(currentTemplateStr !== savedTemplateStr)
  //   }

  //   detectAndSetIsTemplateChanged()
  // }, [template, savedTemplate, selectedCategoryID, selectedSectionID, templateID])

  // useEffect(() => {
  //   async function fetchAndSetTemplate() {
  //     const { formTemplates } = await searchTemplates({
  //       filters: {
  //         formTemplateID: formTemplateID,
  //       },
  //     })
  //     const formTemplate = formTemplates?.[0] || null
  //     setFormTemplate(formTemplate)
  //   }

  //   fetchAndSetTemplate()
  // }, [formTemplateID])

  // useEffect(() => {
  //   async function fetchAndSetFormCategories() {
  //     const { forms } = await searchForms({
  //       filters: {
  //         userID: sessionUserID || 0,
  //         formID: formID,
  //         includeCategories: true,
  //         includeSections: true,
  //       },
  //     })
  //     const form = forms?.[0]
  //     const categories = form?.categories || []
  //     setFormCategories(categories)
  //   }

  //   fetchAndSetFormCategories()
  // }, [template])

  const value = {
    formTemplateID,
    formTemplate,
    setFormTemplate,
    formCategories,
    setFormCategories,
    selectedFormCategoryID,
    setSelectedFormCategoryID,
    formSections,
    setFormSections,
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormCategorySections,
    // formID,
    // template,
    // setTemplate,
    // savedTemplate,
    // setSavedTemplate,
    // isTemplateChanged,
    // setIsTemplateChanged,
    // selectedCategoryID,
    // setSelectedCategoryID,
    // selectedSectionID,
    // setSelectedSectionID,
    // selectedQuestionSetID,
    // setSelectedQuestionSetID,
    // selectedQuestionID,
    // setSelectedQuestionID,
    // formCategories,
    // setFormCategories,
  }

  return (
    <FormTemplateEditContext.Provider value={value}>{children}</FormTemplateEditContext.Provider>
  )
}

export function useFormTemplateEditContext() {
  const context = useContext(FormTemplateEditContext)
  if (context === undefined) {
    throw new Error('useFormTemplateEditContext must be used within a FormTemplateEditProvider')
  }
  return context
}
