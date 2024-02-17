import { QuestionSet } from '@/app/[domain]/(client)/applications/[id]/page'
import TextInputQuestion from '../questionType/text-input-question'

export default function LoopQuestionSet({ questionSet }: { questionSet: QuestionSet }) {
  return (
    <div className="m-[8px] bg-red-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <TextInputQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}
