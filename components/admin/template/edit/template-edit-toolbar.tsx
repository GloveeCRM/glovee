'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import SaveTemplateButton from './save-template-button'
import TemplateEditDefaultToolbar from './template-edit-default-toolbar'

export default function TemplateEditToolbar() {
  const { selectedQuestionSetId } = useTemplateEditContext()

  return (
    <div className="sticky top-0 flex h-screen w-[240px] flex-shrink-0 flex-col bg-n-700 p-[8px] text-n-100">
      <SaveTemplateButton />
      {selectedQuestionSetId ? <div>{selectedQuestionSetId}</div> : <TemplateEditDefaultToolbar />}
    </div>
  )
}
