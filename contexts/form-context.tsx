'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  FormAnswerType,
  FormCategoryType,
  FormQuestionModes,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
  FormType,
} from '@/lib/types/form'
import { fetchFormSectionQuestionSetsAndQuestions, fetchFormContent } from '@/lib/data/form'

type FormContextType = {
  mode: FormQuestionModes
  form: FormType | null
  setForm: (form: FormType | null) => void
  formCategories: FormCategoryType[]
  setFormCategories: (formCategories: FormCategoryType[]) => void
  formSections: FormSectionType[]
  setFormSections: (formSections: FormSectionType[]) => void
  selectedFormCategoryID: number
  setSelectedFormCategoryID: (formCategoryID: number) => void
  selectedFormSectionID: number
  setSelectedFormSectionID: (formSectionID: number) => void
  selectedFormCategorySections: FormSectionType[]
  setSelectedFormSectionQuestionSets: (formQuestionSets: FormQuestionSetType[]) => void
  selectedFormQuestionSetID: number
  setSelectedFormQuestionSetID: (formQuestionSetID: number) => void
  selectedFormQuestionID: number
  setSelectedFormQuestionID: (formQuestionID: number) => void
  selectedFormQuestionSet: FormQuestionSetType | undefined
  selectedFormQuestion: FormQuestionType | undefined
  rootSelectedFormSectionQuestionSets: FormQuestionSetType[]
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => FormQuestionSetType[]
  selectedFormSectionQuestions: FormQuestionType[]
  setSelectedFormSectionQuestions: (formQuestions: FormQuestionType[]) => void
  formQuestionSetQuestions: (formQuestionSetID: number) => FormQuestionType[]
  setFormCategoryCompletionRate: (formCategoryID: number, completionRate: number) => void
  setFormSectionCompletionRate: (formSectionID: number, completionRate: number) => void
  setFormQuestionAnswer: (formQuestionID: number, answer: FormAnswerType | undefined) => void
}

const formContextDefaultValues: FormContextType = {
  mode: FormQuestionModes.ANSWER_ONLY,
  form: null,
  setForm: () => {},
  formCategories: [],
  setFormCategories: () => {},
  formSections: [],
  setFormSections: () => {},
  selectedFormCategoryID: 0,
  setSelectedFormCategoryID: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormCategorySections: [],
  setSelectedFormSectionQuestionSets: () => {},
  selectedFormQuestionSetID: 0,
  setSelectedFormQuestionSetID: () => {},
  selectedFormQuestionID: 0,
  setSelectedFormQuestionID: () => {},
  selectedFormQuestionSet: undefined,
  selectedFormQuestion: undefined,
  rootSelectedFormSectionQuestionSets: [],
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => [],
  selectedFormSectionQuestions: [],
  setSelectedFormSectionQuestions: () => {},
  formQuestionSetQuestions: (formQuestionSetID: number) => [],
  setFormQuestionAnswer: (formQuestionID: number, answer: FormAnswerType | undefined) => {},
  setFormCategoryCompletionRate: () => {},
  setFormSectionCompletionRate: () => {},
}

const FormContext = createContext<FormContextType>(formContextDefaultValues)

interface FormContextProviderProps {
  formID: number
  children: React.ReactNode
  mode: FormQuestionModes
  includeAnswers?: boolean
}

export default function FormContextProvider({
  formID,
  children,
  mode,
  includeAnswers = false,
}: FormContextProviderProps) {
  const [form, setForm] = useState<FormType | null>(null)
  const [formCategories, setFormCategories] = useState<FormCategoryType[]>([])
  const [formSections, setFormSections] = useState<FormSectionType[]>([])
  const [selectedFormSectionQuestionSets, setSelectedFormSectionQuestionSets] = useState<
    FormQuestionSetType[]
  >([])
  const [selectedFormSectionQuestions, setSelectedFormSectionQuestions] = useState<
    FormQuestionType[]
  >([])
  const [selectedFormQuestionSetID, setSelectedFormQuestionSetID] = useState<number>(0)
  const [selectedFormQuestionID, setSelectedFormQuestionID] = useState<number>(0)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const selectedFormSectionID = parseInt(searchParams.get('section') || '0')
  const selectedFormCategoryID = parseInt(searchParams.get('category') || '0')

  const selectedFormCategorySections = useMemo(() => {
    return formSections
      .filter((section) => section.formCategoryID === selectedFormCategoryID)
      .sort((a, b) => a.sectionPosition - b.sectionPosition)
  }, [formSections, selectedFormCategoryID])

  const rootSelectedFormSectionQuestionSets = useMemo(() => {
    return selectedFormSectionQuestionSets
      ?.filter((questionSet) => !questionSet.parentFormQuestionSetID)
      .sort((a, b) => a.formQuestionSetPosition - b.formQuestionSetPosition)
  }, [selectedFormSectionQuestionSets])

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

  useEffect(() => {
    async function fetchAndSetFormContent() {
      const { form, formCategories, formSections } = await fetchFormContent({
        formID,
        includeFormCategories: true,
        includeFormSections: true,
        includeCompletionRates: mode === FormQuestionModes.INTERACTIVE && includeAnswers,
      })
      setForm(form || null)
      const sortedFormCategories = formCategories?.sort(
        (a, b) => a.categoryPosition - b.categoryPosition
      )
      setFormCategories(sortedFormCategories || [])
      // TODO: Sort form sections by category first then by position
      const sortedFormSections = formSections?.sort((a, b) => a.sectionPosition - b.sectionPosition)
      setFormSections(sortedFormSections || [])

      if (!selectedFormCategoryID && formCategories && formCategories.length > 0) {
        setSelectedFormCategoryID(formCategories[0].formCategoryID)
      }
    }

    fetchAndSetFormContent()
  }, [formID])

  useEffect(() => {
    async function fetchAndSetFormSectionQuestionSetsAndQuestions() {
      const { formQuestionSets, formQuestions } = await fetchFormSectionQuestionSetsAndQuestions({
        formSectionID: selectedFormSectionID,
        includeAnswers,
      })
      setSelectedFormSectionQuestionSets(formQuestionSets || [])
      setSelectedFormSectionQuestions(formQuestions || [])
    }

    if (selectedFormSectionID) {
      fetchAndSetFormSectionQuestionSetsAndQuestions()
    }
  }, [selectedFormSectionID])

  useEffect(() => {
    if (selectedFormCategoryID && !selectedFormSectionID && formSections.length > 0) {
      setSelectedFormSectionID(
        formSections.find((section) => section.formCategoryID === selectedFormCategoryID)
          ?.formSectionID || 0
      )
    }
  }, [selectedFormCategoryID, selectedFormSectionID, formSections])

  function setSelectedFormSectionID(formSectionID: number) {
    const params = new URLSearchParams(searchParams)
    params.set('section', String(formSectionID))
    replace(`${pathname}?${params.toString()}`)
  }

  function setSelectedFormCategoryID(formCategoryID: number) {
    const params = new URLSearchParams(searchParams)
    if (selectedFormCategoryID !== formCategoryID) {
      params.set('category', String(formCategoryID))
      params.delete('section')
      replace(`${pathname}?${params.toString()}`)
    }
  }

  function setFormQuestionAnswer(formQuestionID: number, answer: FormAnswerType | undefined) {
    const updatedFormQuestions = selectedFormSectionQuestions?.map((formQuestion) => {
      if (formQuestion.formQuestionID === formQuestionID) {
        return { ...formQuestion, answer }
      }
      return formQuestion
    })
    setSelectedFormSectionQuestions(updatedFormQuestions || [])
  }

  const setFormCategoryCompletionRate = (formCategoryID: number, completionRate: number) => {
    const updatedFormCategories = formCategories.map((formCategory) => {
      if (formCategory.formCategoryID === formCategoryID) {
        return { ...formCategory, completionRate }
      }
      return formCategory
    })
    setFormCategories(updatedFormCategories)
  }

  const setFormSectionCompletionRate = (formSectionID: number, completionRate: number) => {
    const updatedFormSections = formSections.map((formSection) => {
      if (formSection.formSectionID === formSectionID) {
        return { ...formSection, completionRate }
      }
      return formSection
    })
    setFormSections(updatedFormSections)
  }

  const value = {
    mode,
    form,
    setForm,
    formCategories,
    setFormCategories,
    formSections,
    setFormSections,
    selectedFormCategoryID,
    setSelectedFormCategoryID,
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormCategorySections,
    setSelectedFormSectionQuestionSets,
    selectedFormQuestionSetID,
    setSelectedFormQuestionSetID,
    selectedFormQuestionID,
    setSelectedFormQuestionID,
    selectedFormQuestionSet,
    selectedFormQuestion,
    rootSelectedFormSectionQuestionSets,
    formQuestionSetChildFormQuestionSets,
    selectedFormSectionQuestions,
    setSelectedFormSectionQuestions,
    formQuestionSetQuestions,
    setFormQuestionAnswer,
    setFormCategoryCompletionRate,
    setFormSectionCompletionRate,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider')
  }
  return context
}
