'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'
import TemplateQuestionSet from '@/components/forms/question-sets/template-question-set'
import EmptySectionDropzone from './empty-section-dropzone'
import NonEmptySectionDropzone from './non-empty-section-dropzone'

export default function QuestionsEditBoard() {
  const { selectedFormSectionID, selectedFormSectionQuestionSets } = useFormTemplateEditContext()

  return (
    <>
      {selectedFormSectionID ? (
        <div id="questions-edit-board" className="rounded-lg bg-white p-[4px]">
          {selectedFormSectionQuestionSets && selectedFormSectionQuestionSets.length > 0 ? (
            selectedFormSectionQuestionSets.map((formQuestionSet) => (
              <div key={formQuestionSet.formQuestionSetID}>
                {formQuestionSet.formQuestionSetPosition === 1 && (
                  <NonEmptySectionDropzone position={1} isFirstDropzone={true} />
                )}
                <TemplateQuestionSet formQuestionSet={formQuestionSet} />
                <NonEmptySectionDropzone
                  position={formQuestionSet.formQuestionSetPosition + 1}
                  isLastDropzone={
                    selectedFormSectionQuestionSets.length ===
                    formQuestionSet.formQuestionSetPosition
                  }
                />
              </div>
            ))
          ) : (
            <EmptySectionDropzone />
          )}
        </div>
      ) : (
        <div>Create or select a section to begin editing questions</div>
      )}
    </>
  )
}
