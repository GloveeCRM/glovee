'use client'

import { Question } from '@/app/[domain]/(client)/applications/[id]/page'
import { useDebounce } from '@/hooks/use-debounce'
import { saveInput } from '@/lib/actions/form'
import { use, useEffect, useState } from 'react'
export default function TextInputQuestion({ question }: { question: Question }) {
  const [inputValue, setInputValue] = useState('')
  const debouncedInput = useDebounce(inputValue, 1000)

  useEffect(() => {
    if (debouncedInput) {
      saveInput({ input: debouncedInput, questionId: question.id })
    }
  }, [debouncedInput, question.id])

  return (
    <div>
      <p>{question.helperText}</p>
      <label htmlFor="text-question">{question.prompt}</label>
      <input
        name="text-question"
        id="text-question"
        type="text"
        className="border border-black"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
}
