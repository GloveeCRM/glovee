import { QuestionSet } from '@/app/[orgName]/(client)/applications/[id]/page'
import TextInputQuestion from '../../questionType/text-input-question'

export default function FlatQuestionSet({ questionSet }: { questionSet: QuestionSet }) {
  return (
    <div className="bg-green-500 p-[8px]">
      {questionSet?.questions?.map((question) => (
        <TextInputQuestion key={question.id} question={question} />
      ))}
    </div>
  )
}