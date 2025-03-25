'use client'

import { useFormContext } from '@/contexts/form-context'

import FormTemplateQuestionSet from '@/components/forms/question-sets/form-template-question-set'
import EmptySectionDropzone from './empty-section-dropzone'
import NonEmptySectionDropzone from './non-empty-section-dropzone'

export default function QuestionsEditBoard() {
  const { selectedFormSectionID, rootSelectedFormSectionQuestionSets } = useFormContext()

  return (
    <>
      {selectedFormSectionID ? (
        <div id="questions-edit-board" className="rounded-lg bg-white p-[4px] shadow-sm">
          {rootSelectedFormSectionQuestionSets && rootSelectedFormSectionQuestionSets.length > 0 ? (
            rootSelectedFormSectionQuestionSets.map((formQuestionSet) => (
              <div key={formQuestionSet.formQuestionSetID}>
                {formQuestionSet.formQuestionSetPosition === 1 && (
                  <NonEmptySectionDropzone position={1} isFirstDropzone={true} />
                )}
                <FormTemplateQuestionSet formQuestionSet={formQuestionSet} />
                <NonEmptySectionDropzone
                  position={formQuestionSet.formQuestionSetPosition + 1}
                  isLastDropzone={
                    rootSelectedFormSectionQuestionSets.length ===
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
