'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import SaveTemplateButton from './save-template-button'
import TemplateEditDefaultToolbar from './template-edit-default-toolbar'
import QuestionSetSettingsToolbar from './question-set-settings-toolbar'
import QuestionSettingsToolbar from './question-settings-toolbar'

export default function TemplateEditToolbar() {
  const { selectedQuestionSetId, selectedQuestionId } = useTemplateEditContext()

  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-n-700 p-[8px] text-n-100">
      <SaveTemplateButton />
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
