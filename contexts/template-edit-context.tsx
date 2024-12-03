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

import {
  FormCategoryType,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
  FormTemplateType,
} from '@/lib/types/form'
import {
  fetchFormTemplateSectionQuestionSetsAndQuestions,
  fetchFormTemplateWithCategoriesAndSections,
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
  selectedFormSectionQuestionSets: FormQuestionSetType[] | null
  setSelectedFormSectionQuestionSets: Dispatch<SetStateAction<FormQuestionSetType[] | null>>
  selectedFormSectionQuestions: FormQuestionType[] | null
  setSelectedFormSectionQuestions: Dispatch<SetStateAction<FormQuestionType[] | null>>
  selectedFormSectionID: number
  setSelectedFormSectionID: Dispatch<SetStateAction<number>>
  selectedFormQuestionSetID: number
  setSelectedFormQuestionSetID: Dispatch<SetStateAction<number>>
  selectedFormQuestionID: number
  setSelectedFormQuestionID: Dispatch<SetStateAction<number>>
  selectedFormCategorySections: FormSectionType[] | undefined
  rootSelectedFormSectionQuestionSets: FormQuestionSetType[] | undefined
  selectedFormQuestionSet: FormQuestionSetType | undefined
  selectedFormQuestion: FormQuestionType | undefined
  formQuestionSetChildFormQuestionSets: (
    parentFormQuestionSetID: number
  ) => FormQuestionSetType[] | undefined
  formQuestionSetQuestions: (formQuestionSetID: number) => FormQuestionType[] | undefined
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
  selectedFormSectionQuestionSets: null,
  setSelectedFormSectionQuestionSets: () => {},
  selectedFormSectionQuestions: null,
  setSelectedFormSectionQuestions: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormQuestionSetID: 0,
  setSelectedFormQuestionSetID: () => {},
  selectedFormQuestionID: 0,
  setSelectedFormQuestionID: () => {},
  selectedFormCategorySections: undefined,
  rootSelectedFormSectionQuestionSets: undefined,
  selectedFormQuestionSet: undefined,
  selectedFormQuestion: undefined,
  formQuestionSetChildFormQuestionSets: () => undefined,
  formQuestionSetQuestions: () => undefined,
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
  const [selectedFormSectionQuestionSets, setSelectedFormSectionQuestionSets] = useState<
    FormQuestionSetType[] | null
  >(null)
  const [selectedFormSectionQuestions, setSelectedFormSectionQuestions] = useState<
    FormQuestionType[] | null
  >(null)
  const [selectedFormCategoryID, setSelectedFormCategoryID] = useState<number>(0)
  const [selectedFormSectionID, setSelectedFormSectionID] = useState<number>(0)
  const [selectedFormQuestionSetID, setSelectedFormQuestionSetID] = useState<number>(0)
  const [selectedFormQuestionID, setSelectedFormQuestionID] = useState<number>(0)

  const selectedFormCategorySections = useMemo(() => {
    return formSections?.filter((section) => section.formCategoryID === selectedFormCategoryID)
  }, [formSections, selectedFormCategoryID])

  const rootSelectedFormSectionQuestionSets = useMemo(() => {
    return selectedFormSectionQuestionSets
      ?.filter((questionSet) => !questionSet.parentFormQuestionSetID)
      .sort((a, b) => a.formQuestionSetPosition - b.formQuestionSetPosition)
  }, [selectedFormSectionQuestionSets])

  const selectedFormQuestionSet = useMemo(() => {
    return selectedFormSectionQuestionSets?.find(
      (questionSet) => questionSet.formQuestionSetID === selectedFormQuestionSetID
    )
  }, [selectedFormSectionQuestionSets, selectedFormQuestionSetID])

  const selectedFormQuestion = useMemo(() => {
    return selectedFormSectionQuestions?.find(
      (question) => question.formQuestionID === selectedFormQuestionID
    )
  }, [selectedFormSectionQuestions, selectedFormQuestionID])

  const formCategoryExists = (formCategoryID: number) => {
    return formCategories?.find((category) => category.formCategoryID === formCategoryID)
  }

  const formQuestionSetChildFormQuestionSets = (parentFormQuestionSetID: number) => {
    return selectedFormSectionQuestionSets
      ?.filter(
        (formQuestionSet) => formQuestionSet.parentFormQuestionSetID === parentFormQuestionSetID
      )
      .sort((a, b) => a.formQuestionSetPosition - b.formQuestionSetPosition)
  }

  const formQuestionSetQuestions = (formQuestionSetID: number) => {
    return selectedFormSectionQuestions
      ?.filter((formQuestion) => formQuestion.formQuestionSetID === formQuestionSetID)
      .sort((a, b) => a.formQuestionPosition - b.formQuestionPosition)
  }

  useEffect(() => {
    async function fetchAndSetTemplateWithCategoriesAndSections() {
      const { formTemplate, formCategories, formSections } =
        await fetchFormTemplateWithCategoriesAndSections({ formTemplateID })
      setFormTemplate(formTemplate || null)
      setFormCategories(formCategories || [])
      setFormSections(formSections || [])
    }

    fetchAndSetTemplateWithCategoriesAndSections()
  }, [formTemplateID])

  // Fetch the question sets for the selected section
  useEffect(() => {
    async function fetchAndSetFormTemplateSectionQuestionSetsAndQuestions() {
      const { formQuestionSets, formQuestions } =
        await fetchFormTemplateSectionQuestionSetsAndQuestions({
          formSectionID: selectedFormSectionID,
        })
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }

    if (selectedFormSectionID) {
      fetchAndSetFormTemplateSectionQuestionSetsAndQuestions()
    }
  }, [selectedFormSectionID])

  // Set the first category as selected if no category is selected
  useEffect(() => {
    if (
      formCategories &&
      formCategories.length > 0 &&
      (!selectedFormCategoryID || !formCategoryExists(selectedFormCategoryID))
    ) {
      setSelectedFormCategoryID(formCategories[0].formCategoryID)
    } else if (!formCategories || formCategories.length === 0) {
      setSelectedFormCategoryID(0)
    }
  }, [formCategories])

  // Set the selected category's first section when the selected category changes
  useEffect(() => {
    if (selectedFormCategorySections && selectedFormCategorySections.length > 0) {
      setSelectedFormSectionID(selectedFormCategorySections?.[0]?.formSectionID || 0)
    } else if (!selectedFormCategorySections || selectedFormCategorySections.length === 0) {
      setSelectedFormSectionID(0)
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
    selectedFormSectionQuestionSets,
    setSelectedFormSectionQuestionSets,
    selectedFormSectionQuestions,
    setSelectedFormSectionQuestions,
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormQuestionSetID,
    setSelectedFormQuestionSetID,
    selectedFormQuestionID,
    setSelectedFormQuestionID,
    selectedFormCategorySections,
    rootSelectedFormSectionQuestionSets,
    selectedFormQuestionSet,
    selectedFormQuestion,
    formQuestionSetChildFormQuestionSets,
    formQuestionSetQuestions,
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
