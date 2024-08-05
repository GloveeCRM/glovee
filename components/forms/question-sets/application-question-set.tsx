import { ApplicationQuestionSetType, ApplicationQuestionSetTypes } from '@/lib/types/application'
import FlatQuestionSet from './flat/flat-question-set'
import LoopQuestionSet from './loop/loop-question-set'
import DependsOnQuestionSet from './depends-on/depends-on-question-set'

interface ApplicationQuestionSetProps {
  questionSet: ApplicationQuestionSetType
}

export default function ApplicationQuestionSet({ questionSet }: ApplicationQuestionSetProps) {
  const isFlat = questionSet.type === ApplicationQuestionSetTypes.FLAT
  const isLoop = questionSet.type === ApplicationQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === ApplicationQuestionSetTypes.DEPENDS_ON

  return (
    <div className="w-full">
      {isFlat ? (
        <FlatQuestionSet questionSet={questionSet} />
      ) : isLoop ? (
        <LoopQuestionSet questionSet={questionSet} />
      ) : isDependsOn ? (
        <DependsOnQuestionSet questionSet={questionSet} />
      ) : null}
    </div>
  )
}
