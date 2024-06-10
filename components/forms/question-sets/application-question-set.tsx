import { ApplicationQuestionSetType, ApplicationQuestionSetTypes } from '@/lib/types/application'
import FlatQuestionSetView from './flat/flat-question-set-view'
import LoopQuestionSetView from './loop/loop-question-set-view'
import DependsOnQuestionSetView from './depends-on/depends-on-question-set-view'

interface ApplicationQuestionSetProps {
  questionSet: ApplicationQuestionSetType
}

export default function ApplicationQuestionSet({ questionSet }: ApplicationQuestionSetProps) {
  const isFlat = questionSet.type === ApplicationQuestionSetTypes.FLAT
  const isLoop = questionSet.type === ApplicationQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === ApplicationQuestionSetTypes.DEPENDS_ON

  return (
    <div>
      {isFlat ? (
        <FlatQuestionSetView questionSet={questionSet} />
      ) : isLoop ? (
        <LoopQuestionSetView questionSet={questionSet} />
      ) : isDependsOn ? (
        <DependsOnQuestionSetView questionSet={questionSet} />
      ) : null}
    </div>
  )
}
