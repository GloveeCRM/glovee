import { QuestionSet } from '@/app/[domain]/(client)/applications/[id]/page'

export default function FlatQuestionSet({ questionSet }: { questionSet: QuestionSet }) {
  console.log(questionSet)
  return (
    <div className="m-[8px] bg-green-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <div key={question.id}>
          <h4>{question.prompt}</h4>
          <p>{question.helperText}</p>
        </div>
      ))}
    </div>
  )
}
