import { QuestionSet } from '@/app/[domain]/(client)/applications/[id]/page'
import TextInputQuestion from '../questionType/text-input-question'

export default function FlatQuestionSet({ questionSet }: { questionSet: QuestionSet }) {
  return (
    <div className="m-[8px] bg-green-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <TextInputQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}
