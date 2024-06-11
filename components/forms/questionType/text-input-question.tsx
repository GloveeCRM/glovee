'use client'

import { useDebouncedCallback } from 'use-debounce'

import { QuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'

export default function TextInputQuestion({ question }: { question: QuestionType }) {
  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    saveAnswer('orgName', 0, { text: e.target.value })
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
        onChange={handleChange}
      />
    </div>
  )
}
