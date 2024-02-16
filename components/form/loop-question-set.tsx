import { QuestionSet } from '@/app/[domain]/(client)/applications/[id]/page'

export default function LoopQuestionSet({ questionSet }: { questionSet: QuestionSet }) {
  return (
    <div className="m-[8px] bg-red-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <div key={question.id}>
          <h4>{question.prompt}</h4>
          <p>{question.helperText}</p>
        </div>
      ))}
    </div>
  )
}
