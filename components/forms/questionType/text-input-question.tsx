import { Question } from '@/app/[domain]/(client)/applications/[id]/page'
export default function TextInputQuestion({ question }: { question: Question }) {
  return (
    <div>
      <p>{question.helperText}</p>
      <label htmlFor="text-question">{question.prompt}</label>
      <input name="text-question" id="text-question" type="text" className="border border-black" />
    </div>
  )
}
