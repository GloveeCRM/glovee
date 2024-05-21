'use client'

import { Question } from '@/app/[orgName]/(client)/application/[id]/page'
import { saveTextInputAnswer } from '@/lib/actions/form'
import { useDebouncedCallback } from 'use-debounce'

export default function TextInputQuestion({ question }: { question: Question }) {
  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    saveTextInputAnswer({ input: e.target.value, questionId: question.id })
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
        // defaultValue={question.answer?.text || ''}
        onChange={handleChange}
      />
    </div>
  )
}
