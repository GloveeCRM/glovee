'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateQuestionSet from '@/components/forms/question-sets/template-question-set'
import EmptySectionDropzone from './empty-section-dropzone'
import NonEmptySectionDropzone from './non-empty-section-dropzone'

export default function QuestionsEditBoard() {
  const { template, selectedCategoryID, selectedSectionID } = useTemplateEditContext()

  const templateQuestionSets = template?.categories
    ?.find((category) => category.categoryID === selectedCategoryID)
    ?.sections?.find((section) => section.id === selectedSectionID)?.questionSets

  return (
    <div id="questions-edit-board" className="rounded-lg bg-white p-[4px]">
      {templateQuestionSets && templateQuestionSets.length > 0 ? (
        templateQuestionSets.map((questionSet) => (
          <div key={questionSet.id}>
            {questionSet.position === 0 && <NonEmptySectionDropzone position={0} />}
            <TemplateQuestionSet questionSet={questionSet} />
            <NonEmptySectionDropzone position={questionSet.position + 1} />
          </div>
        ))
      ) : (
        <EmptySectionDropzone />
      )}
    </div>
  )
}
