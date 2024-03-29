'use client'

import { useTemplateEditContext } from '@/contexts/template-edit-context'
import EmptySectionQuestionSetDropzone from './empty-section-question-set-dropzone'
import FlatQuestionSetEdit from '@/components/forms/question-set-types/flat/flat-question-set-edit'
import LoopQuestionSetEdit from '@/components/forms/question-set-types/loop/loop-question-set-edit'

export default function QuestionsEditBoard() {
  const { template } = useTemplateEditContext()
  const templateQuestionSets = template?.categories?.[0]?.sections?.[0]?.questionSets

  return (
    <div
      id="questions-edit-board"
      className="flex h-full flex-col gap-[4px] rounded-lg bg-white p-[4px]"
    >
      {templateQuestionSets ? (
        templateQuestionSets.map((questionSet) =>
          questionSet.type === 'flat' ? (
            <FlatQuestionSetEdit key={questionSet.id} questionSet={questionSet} />
          ) : questionSet.type === 'loop' ? (
            <LoopQuestionSetEdit key={questionSet.id} questionSet={questionSet} />
          ) : null
        )
      ) : (
        <EmptySectionQuestionSetDropzone />
      )}
    </div>
  )
}
