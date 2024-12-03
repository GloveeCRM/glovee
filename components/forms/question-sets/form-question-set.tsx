import {
  FormQuestionSetType,
  isConditionalQuestionSetType,
  isRepeatableQuestionSetType,
  isStaticQuestionSetType,
} from '@/lib/types/form'

import FlatQuestionSet from './flat/flat-question-set'
import LoopQuestionSet from './loop/loop-question-set'
import DependsOnQuestionSet from './depends-on/depends-on-question-set'

interface FormQuestionSetProps {
  questionSet: FormQuestionSetType
}

export default function FormQuestionSet({ questionSet }: FormQuestionSetProps) {
  const isStatic = isStaticQuestionSetType(questionSet)
  const isRepeatable = isRepeatableQuestionSetType(questionSet)
  const isConditional = isConditionalQuestionSetType(questionSet)

  return (
    <div className="w-full">
      {isStatic ? (
        <FlatQuestionSet questionSet={questionSet} />
      ) : isRepeatable ? (
        <LoopQuestionSet questionSet={questionSet} />
      ) : isConditional ? (
        <DependsOnQuestionSet formQuestionSet={questionSet} />
      ) : null}
    </div>
  )
}
