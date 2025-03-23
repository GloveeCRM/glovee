'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  FormAnswerType,
  FormCategoryType,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
  FormType,
} from '@/lib/types/form'
import { fetchFormSectionQuestionSetsAndQuestions, fetchFormContent } from '@/lib/data/form'
type FormContextType = {
  formID: number
  mode: 'view' | 'edit'
  form: FormType | null
  formCategories: FormCategoryType[]
  formSections: FormSectionType[]
  selectedFormCategoryID: number
  setSelectedFormCategoryID: (formCategoryID: number) => void
  selectedFormSectionID: number
  setSelectedFormSectionID: (formSectionID: number) => void
  selectedFormCategorySections: FormSectionType[]
  selectedFormSectionQuestionSets: FormQuestionSetType[]
  setSelectedFormSectionQuestionSets: (formQuestionSets: FormQuestionSetType[]) => void
  rootSelectedFormSectionQuestionSets: FormQuestionSetType[]
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => FormQuestionSetType[]
  selectedFormSectionQuestions: FormQuestionType[]
  setSelectedFormSectionQuestions: (formQuestions: FormQuestionType[]) => void
  formQuestionSetQuestions: (formQuestionSetID: number) => FormQuestionType[]
  setFormQuestionAnswer: (formQuestionID: number, answer: FormAnswerType | undefined) => void
}

const formContextDefaultValues: FormContextType = {
  formID: 0,
  mode: 'view',
  form: null,
  formCategories: [],
  formSections: [],
  selectedFormCategoryID: 0,
  setSelectedFormCategoryID: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormCategorySections: [],
  selectedFormSectionQuestionSets: [],
  setSelectedFormSectionQuestionSets: () => {},
  rootSelectedFormSectionQuestionSets: [],
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => [],
  selectedFormSectionQuestions: [],
  setSelectedFormSectionQuestions: () => {},
  formQuestionSetQuestions: (formQuestionSetID: number) => [],
  setFormQuestionAnswer: (formQuestionID: number, answer: FormAnswerType | undefined) => {},
}

const FormContext = createContext<FormContextType>(formContextDefaultValues)

interface FormContextProviderProps {
  formID: number
  children: React.ReactNode
  mode: 'view' | 'edit'
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

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const selectedFormSectionID = parseInt(searchParams.get('section') || '0')
  const selectedFormCategoryID =
    formSections.find((section) => section.formSectionID === selectedFormSectionID)
      ?.formCategoryID || 0

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

  useEffect(() => {
    async function fetchAndSetFormContent() {
      const { form, formCategories, formSections } = await fetchFormContent({
        formID,
        includeFormCategories: true,
        includeFormSections: true,
        includeCompletionRates: mode === 'edit' && includeAnswers,
      })
      setForm(form || null)
      const sortedFormCategories = formCategories?.sort(
        (a, b) => a.categoryPosition - b.categoryPosition
      )
      setFormCategories(sortedFormCategories || [])
      const sortedFormSections = formSections?.sort((a, b) => a.sectionPosition - b.sectionPosition)
      setFormSections(sortedFormSections || [])

      if (!selectedFormSectionID && formSections && formSections.length > 0) {
        setSelectedFormSectionID(formSections[0].formSectionID)
      }
    }

    fetchAndSetFormContent()
  }, [formID, selectedFormSectionQuestions])

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

  function setSelectedFormSectionID(formSectionID: number) {
    const params = new URLSearchParams(searchParams)
    params.set('section', String(formSectionID))
    replace(`${pathname}?${params.toString()}`)
  }

  function setSelectedFormCategoryID(formCategoryID: number) {
    const firstSectionID =
      formSections.find((section) => section.formCategoryID === formCategoryID)?.formSectionID || 0
    setSelectedFormSectionID(firstSectionID)
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

  const value = {
    formID,
    mode,
    form,
    formCategories,
    formSections,
    selectedFormCategoryID,
    setSelectedFormCategoryID,
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormCategorySections,
    selectedFormSectionQuestionSets,
    setSelectedFormSectionQuestionSets,
    rootSelectedFormSectionQuestionSets,
    formQuestionSetChildFormQuestionSets,
    selectedFormSectionQuestions,
    setSelectedFormSectionQuestions,
    formQuestionSetQuestions,
    setFormQuestionAnswer,
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
