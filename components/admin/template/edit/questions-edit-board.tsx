'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import EmptySectionQuestionSetDropzone from './empty-section-question-set-dropzone'

export default function QuestionsEditBoard() {
  const { template } = useTemplateEditContext()
  const templateQuestionSets = template?.categories?.[0]?.sections?.[0]?.questionSets

  return (
    <div id="questions-edit-board" className="h-full rounded-lg bg-white p-[4px]">
      {templateQuestionSets ? (
        templateQuestionSets.map((questionSet) => (
          <div key={questionSet.id} className="p-[4px]">
            {questionSet.type}
          </div>
        ))
      ) : (
        <EmptySectionQuestionSetDropzone />
      )}
    </div>
  )
}
