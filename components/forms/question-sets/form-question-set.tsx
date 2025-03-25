import {
  FormQuestionSetType,
  isConditionalQuestionSetType,
  isRepeatableQuestionSetType,
  isStaticQuestionSetType,
} from '@/lib/types/form'

import StaticQuestionSet from './flat/static-question-set'
import RepeatableQuestionSet from './repeatable/repeatable-question-set'
import ConditionalQuestionSet from './depends-on/conditional-question-set'

interface FormQuestionSetProps {
  formQuestionSet: FormQuestionSetType
}

export default function FormQuestionSet({ formQuestionSet }: FormQuestionSetProps) {
  const isStatic = isStaticQuestionSetType(formQuestionSet)
  const isRepeatable = isRepeatableQuestionSetType(formQuestionSet)
  const isConditional = isConditionalQuestionSetType(formQuestionSet)

  return (
    <div className="w-full">
      {isStatic ? (
        <StaticQuestionSet formQuestionSet={formQuestionSet} />
      ) : isRepeatable ? (
        <RepeatableQuestionSet formQuestionSet={formQuestionSet} />
      ) : isConditional ? (
        <ConditionalQuestionSet formQuestionSet={formQuestionSet} />
      ) : null}
    </div>
  )
}
