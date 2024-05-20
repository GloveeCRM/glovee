'use client'

import { saveTextInputAnswer } from '@/lib/actions/form'
import { ApplicationQuestionType } from '@/lib/types/application'
import { TemplateQuestionType } from '@/lib/types/template'
import { useDebouncedCallback } from 'use-debounce'

export default function TextInputQuestion({
  question,
}: {
  question: ApplicationQuestionType | TemplateQuestionType
}) {
  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    saveTextInputAnswer({ input: e.target.value, questionId: String(question.id) })
  }, 500)

  return (
    <div>
      <p>{question.helperText}</p>
      <label htmlFor="text-question">{question.prompt}</label>
      <input
        name="text-question"
        id="text-question"
        type="text"
        className="border border-black"
        defaultValue={''}
        onChange={handleChange}
      />
    </div>
  )
}
