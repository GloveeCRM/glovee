'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import EmptySectionQuestionSetDropzone from './empty-section-question-set-dropzone'
import FlatQuestionSetEdit from '@/components/forms/question-sets/flat/flat-question-set-edit'
import LoopQuestionSetEdit from '@/components/forms/question-sets/loop/loop-question-set-edit'
import DependsOnQuestionSetEdit from '@/components/forms/question-sets/depends-on/depends-on-question-set-edit'
import TemplateQuestionSet from '@/components/forms/question-sets/template-question-set'

export default function QuestionsEditBoard() {
  const { template, selectedCategoryId, selectedSectionId } = useTemplateEditContext()

  const templateQuestionSets = template?.categories
    ?.find((category) => category.id === selectedCategoryId)
    ?.sections?.find((section) => section.id === selectedSectionId)?.questionSets

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
