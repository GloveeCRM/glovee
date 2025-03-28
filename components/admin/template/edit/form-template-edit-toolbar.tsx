'use client'

import { useFormContext } from '@/contexts/form-context'

import FormTemplateEditDefaultToolbar from './form-template-edit-default-toolbar'
import QuestionSetSettingsToolbar from './question-set-settings-toolbar'
import QuestionSettingsToolbar from './question-settings-toolbar'

export default function FormTemplateEditToolbar() {
  const { selectedFormQuestionSet, selectedFormQuestionID } = useFormContext()

  return (
    <div
      id="templateEditToolbar"
      className="flex h-svh w-[240px] flex-shrink-0 flex-col overflow-y-scroll bg-zinc-800 px-[8px] text-white"
    >
      {selectedFormQuestionID ? (
        <QuestionSettingsToolbar formQuestionID={selectedFormQuestionID} />
      ) : selectedFormQuestionSet ? (
        <QuestionSetSettingsToolbar formQuestionSet={selectedFormQuestionSet} />
      ) : (
        <FormTemplateEditDefaultToolbar />
      )}
    </div>
  )
}
