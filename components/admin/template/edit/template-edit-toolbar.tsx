'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import SaveTemplateButton from './save-template-button'
import TemplateEditDefaultToolbar from './template-edit-default-toolbar'
import QuestionSetSettingsToolbar from './question-set-settings-toolbar'
import QuestionSettingsToolbar from './question-settings-toolbar'

export default function TemplateEditToolbar() {
  const { selectedQuestionSetId, selectedQuestionId } = useTemplateEditContext()

  return (
    <div className="flex h-svh w-[240px] flex-shrink-0 flex-col overflow-y-scroll bg-n-700 px-[6px] text-n-100">
      <div className="sticky top-0 z-10 bg-n-700 py-[6px]">
        <SaveTemplateButton />
      </div>
      {selectedQuestionSetId ? (
        <QuestionSetSettingsToolbar questionSetId={selectedQuestionSetId} />
      ) : selectedQuestionId ? (
        <QuestionSettingsToolbar questionId={selectedQuestionId} />
      ) : (
        <TemplateEditDefaultToolbar />
      )}
    </div>
  )
}
