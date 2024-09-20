import { FormQuestionSetType, FormQuestionSetTypes } from '@/lib/types/form'
import FlatQuestionSet from './flat/flat-question-set'
import LoopQuestionSet from './loop/loop-question-set'
import DependsOnQuestionSet from './depends-on/depends-on-question-set'

interface FormQuestionSetProps {
  questionSet: FormQuestionSetType
}

export default function FormQuestionSet({ questionSet }: FormQuestionSetProps) {
  const isFlat = questionSet.type === FormQuestionSetTypes.FLAT
  const isLoop = questionSet.type === FormQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === FormQuestionSetTypes.DEPENDS_ON

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
