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
  FormSectionType,
  FormTemplateType,
} from '@/lib/types/form'
import {
  fetchFormSectionQuestionSets,
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
  selectedFormSectionID: number
  setSelectedFormSectionID: Dispatch<SetStateAction<number>>
  selectedFormQuestionSetID: number
  setSelectedFormQuestionSetID: Dispatch<SetStateAction<number>>
  selectedFormCategorySections: FormSectionType[] | undefined
  rootSelectedFormSectionQuestionSets: FormQuestionSetType[] | undefined
  selectedFormQuestionSet: FormQuestionSetType | undefined
  getChildFormQuestionSets: (parentFormQuestionSetID: number) => FormQuestionSetType[] | undefined
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
  selectedFormSectionQuestionSets: null,
  setSelectedFormSectionQuestionSets: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormQuestionSetID: 0,
  setSelectedFormQuestionSetID: () => {},
  selectedFormCategorySections: undefined,
  rootSelectedFormSectionQuestionSets: undefined,
  selectedFormQuestionSet: undefined,
  getChildFormQuestionSets: () => undefined,
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
  const [selectedFormSectionQuestionSets, setSelectedFormSectionQuestionSets] = useState<
    FormQuestionSetType[] | null
  >(null)
  const [selectedFormCategoryID, setSelectedFormCategoryID] = useState<number>(0)
  const [selectedFormSectionID, setSelectedFormSectionID] = useState<number>(0)
  const [selectedFormQuestionSetID, setSelectedFormQuestionSetID] = useState<number>(0)

  const selectedFormCategorySections = useMemo(() => {
    return formSections?.filter((section) => section.formCategoryID === selectedFormCategoryID)
  }, [formSections, selectedFormCategoryID])

  const rootSelectedFormSectionQuestionSets = useMemo(() => {
    return selectedFormSectionQuestionSets?.filter(
      (questionSet) => !questionSet.parentFormQuestionSetID
    )
  }, [selectedFormSectionQuestionSets])

  const selectedFormQuestionSet = useMemo(() => {
    return selectedFormSectionQuestionSets?.find(
      (questionSet) => questionSet.formQuestionSetID === selectedFormQuestionSetID
    )
  }, [selectedFormSectionQuestionSets, selectedFormQuestionSetID])

  const formCategoryExists = (formCategoryID: number) => {
    return formCategories?.find((category) => category.formCategoryID === formCategoryID)
  }

  const getChildFormQuestionSets = (parentFormQuestionSetID: number) => {
    return selectedFormSectionQuestionSets?.filter(
      (formQuestionSet) => formQuestionSet.parentFormQuestionSetID === parentFormQuestionSetID
    )
  }

  useEffect(() => {
    async function fetchAndSetTemplateWithCategoriesAndSections() {
      const { formTemplate, formCategories, formSections } =
        await fetchFormTemplateWithCategoriesAndSections({ formTemplateID })
      setFormTemplate(formTemplate || null)
      setFormCategories(formCategories || null)
      setFormSections(formSections || null)
    }

    fetchAndSetTemplateWithCategoriesAndSections()
  }, [formTemplateID])

  // Fetch the question sets for the selected section
  useEffect(() => {
    async function fetchAndSetFormSectionQuestionSets() {
      const { formQuestionSets } = await fetchFormSectionQuestionSets({
        formSectionID: selectedFormSectionID,
      })
      setSelectedFormSectionQuestionSets(formQuestionSets || null)
    }

    if (selectedFormSectionID) {
      fetchAndSetFormSectionQuestionSets()
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
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormQuestionSetID,
    setSelectedFormQuestionSetID,
    selectedFormCategorySections,
    rootSelectedFormSectionQuestionSets,
    selectedFormQuestionSet,
    getChildFormQuestionSets,
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
