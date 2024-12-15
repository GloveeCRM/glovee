'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import {
  FormCategoryType,
  FormQuestionSetType,
  FormQuestionType,
  FormSectionType,
} from '@/lib/types/form'
import {
  fetchApplicationFormCategoriesAndSections,
  fetchApplicationFormSectionQuestionSetsAndQuestions,
} from '@/lib/data/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type ApplicationFormContextType = {
  applicationFormID: number
  formCategories: FormCategoryType[]
  formSections: FormSectionType[]
  selectedFormCategoryID: number
  setSelectedFormCategoryID: (formCategoryID: number) => void
  selectedFormSectionID: number
  setSelectedFormSectionID: (formSectionID: number) => void
  selectedFormCategorySections: FormSectionType[]
  rootSelectedFormSectionQuestionSets: FormQuestionSetType[]
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => FormQuestionSetType[]
  formQuestionSetQuestions: (formQuestionSetID: number) => FormQuestionType[]
}

const applicationFormContextDefaultValues: ApplicationFormContextType = {
  applicationFormID: 0,
  formCategories: [],
  formSections: [],
  selectedFormCategoryID: 0,
  setSelectedFormCategoryID: () => {},
  selectedFormSectionID: 0,
  setSelectedFormSectionID: () => {},
  selectedFormCategorySections: [],
  rootSelectedFormSectionQuestionSets: [],
  formQuestionSetChildFormQuestionSets: (parentFormQuestionSetID: number) => [],
  formQuestionSetQuestions: (formQuestionSetID: number) => [],
}

const ApplicationFormContext = createContext<ApplicationFormContextType>(
  applicationFormContextDefaultValues
)

interface ApplicationFormContextProviderProps {
  applicationFormID: number
  children: React.ReactNode
}

export default function ApplicationFormContextProvider({
  applicationFormID,
  children,
}: ApplicationFormContextProviderProps) {
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
    return formSections.filter((section) => section.formCategoryID === selectedFormCategoryID)
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
    async function fetchAndSetFormCategoriesAndSections() {
      const { formCategories, formSections } = await fetchApplicationFormCategoriesAndSections({
        applicationFormID,
      })
      setFormCategories(formCategories || [])
      setFormSections(formSections || [])

      if (formSections && formSections.length > 0) {
        setSelectedFormSectionID(formSections[0].formSectionID)
      }
    }

    fetchAndSetFormCategoriesAndSections()
  }, [applicationFormID])

  useEffect(() => {
    async function fetchAndSetFormSectionQuestionSetsAndQuestions() {
      const { formQuestionSets, formQuestions } =
        await fetchApplicationFormSectionQuestionSetsAndQuestions({
          formSectionID: selectedFormSectionID,
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

  const value = {
    applicationFormID,
    formCategories,
    formSections,
    selectedFormCategoryID,
    setSelectedFormCategoryID,
    selectedFormSectionID,
    setSelectedFormSectionID,
    selectedFormCategorySections,
    rootSelectedFormSectionQuestionSets,
    formQuestionSetChildFormQuestionSets,
    formQuestionSetQuestions,
  }

  return <ApplicationFormContext.Provider value={value}>{children}</ApplicationFormContext.Provider>
}

export function useApplicationFormContext() {
  const context = useContext(ApplicationFormContext)
  if (!context) {
    throw new Error(
      'useApplicationFormContext must be used within a ApplicationFormContextProvider'
    )
  }
  return context
}
