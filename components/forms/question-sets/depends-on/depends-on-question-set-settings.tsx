'use client'

import { TemplateQuestionSetType } from '@/lib/types/template'
import RadioQuestionSettings from '../../questions/radio-question/radio-question-settings'
import { isRadioQuestionType } from '@/lib/types/qusetion'
import { useEffect } from 'react'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'

interface DependsOnQuestionSetSettingsProps {
  questionSet: TemplateQuestionSetType
}

export default function DependsOnQuestionSetSettings({
  questionSet,
}: DependsOnQuestionSetSettingsProps) {
  const { removeQuestionSetFromSection } = useQuestionSetActions()
  const question = questionSet.questions?.[0]

  useEffect(() => {
    if (question && isRadioQuestionType(question)) {
      // If some questionSet.questionSets have a dependsOn value that does not exist in question.setttings.options, remove the questionSet
      const optionIDs = question.settings.options.map((option) => option.id)
      const invalidQuestionSets = questionSet.questionSets?.filter(
        (questionSet) => !optionIDs.includes(questionSet.dependsOn || 0)
      )

      if (invalidQuestionSets?.length) {
        invalidQuestionSets.forEach((questionSet) => {
          removeQuestionSetFromSection(questionSet.id)
        })
      }
    }
  }, [question])

  return (
    <div className="">
      {question && isRadioQuestionType(question) && <RadioQuestionSettings question={question} />}
    </div>
  )
}
