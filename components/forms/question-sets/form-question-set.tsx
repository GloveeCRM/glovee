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
  formQuestionSet: FormQuestionSetType
  mode: 'edit' | 'view'
}

export default function FormQuestionSet({ formQuestionSet, mode }: FormQuestionSetProps) {
  const isStatic = isStaticQuestionSetType(formQuestionSet)
  const isRepeatable = isRepeatableQuestionSetType(formQuestionSet)
  const isConditional = isConditionalQuestionSetType(formQuestionSet)

  return (
    <div className="w-full">
      {isStatic ? (
        <FlatQuestionSet formQuestionSet={formQuestionSet} mode={mode} />
      ) : isRepeatable ? (
        <LoopQuestionSet formQuestionSet={formQuestionSet} mode={mode} />
      ) : isConditional ? (
        <DependsOnQuestionSet formQuestionSet={formQuestionSet} mode={mode} />
      ) : null}
    </div>
  )
}
