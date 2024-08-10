import { ApplicationQuestionSetType } from '@/lib/types/application'
import { RadioQuestionType } from '@/lib/types/qusetion'
import ApplicationQuestion from '../../questions/application-question'
import ApplicationQuestionSet from '../application-question-set'
import { Separator } from '@/components/ui/separator'

interface DependsOnQuestionSetProps {
  questionSet: ApplicationQuestionSetType
  viewOnly?: boolean
}

export default function DependsOnQuestionSet({
  questionSet,
  viewOnly = false,
}: DependsOnQuestionSetProps) {
  const question = questionSet.questions?.[0] as RadioQuestionType

  const questionSets = questionSet.questionSets
  const questionSetsToDisplay = questionSets?.filter(
    (qs) => qs.dependsOn === question.answer?.optionIDs?.[0]
  )

  return (
    <div className="flex flex-col gap-[12px]">
      <ApplicationQuestion key={question.id} question={question} viewOnly={viewOnly} />
      {questionSetsToDisplay && questionSetsToDisplay.length > 0 && (
        <>
          <Separator className="bg-n-400" />
          <div className="flex flex-col gap-[16px]">
            {questionSetsToDisplay.map((qs) => (
              <ApplicationQuestionSet key={qs.id} questionSet={qs} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
