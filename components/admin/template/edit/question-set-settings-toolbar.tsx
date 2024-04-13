import { motion } from 'framer-motion'

import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import { TemplateQuestionSetType } from '@prisma/client'
import FlatQuestionSetSettingsCard from '@/components/forms/question-sets/flat/flat-question-set-settings-card'
import LoopQuestionSetSettingsCard from '@/components/forms/question-sets/loop/loop-question-set-settings-card'
import DependsOnQuestionSetSettingsCard from '@/components/forms/question-sets/depends-on/depends-on-question-set-settings-card'

interface QuestionSetSettingsToolbarProps {
  questionSetId: string
}

export default function QuestionSetSettingsToolbar({
  questionSetId,
}: QuestionSetSettingsToolbarProps) {
  const { getQuestionSetById } = useQuestionSetActions()

  const questionSet = getQuestionSetById(questionSetId)

  const isFlat = questionSet?.type === TemplateQuestionSetType.FLAT
  const isLoop = questionSet?.type === TemplateQuestionSetType.LOOP
  const isDependsOn = questionSet?.type === TemplateQuestionSetType.DEPENDS_ON

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.05 }}>
      <div>Question Set Settings</div>
      {isFlat ? (
        <FlatQuestionSetSettingsCard questionSet={questionSet} />
      ) : isLoop ? (
        <LoopQuestionSetSettingsCard questionSet={questionSet} />
      ) : isDependsOn ? (
        <DependsOnQuestionSetSettingsCard questionSet={questionSet} />
      ) : null}
    </motion.div>
  )
}
