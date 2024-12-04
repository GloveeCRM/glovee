'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateEditDefaultToolbar from './template-edit-default-toolbar'
import QuestionSetSettingsToolbar from './question-set-settings-toolbar'
import QuestionSettingsToolbar from './question-settings-toolbar'

export default function TemplateEditToolbar() {
  const { selectedFormQuestionSet, selectedFormQuestionID } = useFormTemplateEditContext()

  return (
    <div
      id="templateEditToolbar"
      className="flex h-svh w-[240px] flex-shrink-0 flex-col overflow-y-scroll bg-n-700 px-[8px] text-n-100"
    >
      {selectedFormQuestionID ? (
        <QuestionSettingsToolbar formQuestionID={selectedFormQuestionID} />
      ) : selectedFormQuestionSet ? (
        <QuestionSetSettingsToolbar formQuestionSet={selectedFormQuestionSet} />
      ) : (
        <TemplateEditDefaultToolbar />
      )}
    </div>
  )
}
