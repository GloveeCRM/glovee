'use client'

import { useFormTemplateEditContext } from '@/contexts/template-edit-context'

import FormQuestionSet from '@/components/forms/question-sets/form-question-set'

export default function FormTemplateQuestionSetsContainer() {
  const { rootSelectedFormSectionQuestionSets } = useFormTemplateEditContext()

  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll p-[8px]">
      {rootSelectedFormSectionQuestionSets && rootSelectedFormSectionQuestionSets.length > 0 ? (
        rootSelectedFormSectionQuestionSets.map((formQuestionSet) => (
          <div
            key={formQuestionSet.formQuestionSetID}
            className="flex w-full flex-col gap-[8px] rounded-lg border border-zinc-400 p-[8px]"
          >
            <FormQuestionSet
              key={formQuestionSet.formQuestionSetID}
              formQuestionSet={formQuestionSet}
              mode="view"
            />
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}
