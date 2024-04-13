'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateQuestionSet from '@/components/forms/question-sets/template-question-set'
import EmptySectionQuestionSetDropzone from './empty-section-question-set-dropzone'
import NoSectionSelectedCard from './no-section-selected-card'

export default function QuestionsEditBoard() {
  const { template, selectedCategoryId, selectedSectionId } = useTemplateEditContext()

  const templateQuestionSets = template?.categories
    ?.find((category) => category.id === selectedCategoryId)
    ?.sections?.find((section) => section.id === selectedSectionId)?.questionSets

  return selectedSectionId ? (
    <div id="questions-edit-board" className="rounded-lg bg-white p-[4px]">
      {templateQuestionSets && templateQuestionSets.length > 0 ? (
        templateQuestionSets.map((questionSet) => (
          <TemplateQuestionSet key={questionSet.id} questionSet={questionSet} />
        ))
      ) : (
        <EmptySectionQuestionSetDropzone />
      )}
    </div>
  ) : (
    <NoSectionSelectedCard />
  )
}
