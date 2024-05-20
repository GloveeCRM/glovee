'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateQuestionSet from '@/components/forms/question-sets/template-question-set'
import EmptySectionQuestionSetDropzone from './empty-section-question-set-dropzone'

export default function QuestionsEditBoard() {
  const { template, selectedCategoryID, selectedSectionID } = useTemplateEditContext()

  const templateQuestionSets = template?.categories
    ?.find((category) => category.id === selectedCategoryID)
    ?.sections?.find((section) => section.id === selectedSectionID)?.questionSets

  return (
    <div id="questions-edit-board" className="rounded-lg bg-white p-[4px]">
      {templateQuestionSets && templateQuestionSets.length > 0 ? (
        templateQuestionSets.map((questionSet) => (
          <TemplateQuestionSet key={questionSet.id} questionSet={questionSet} />
        ))
      ) : (
        <EmptySectionQuestionSetDropzone />
      )}
    </div>
  )
}
