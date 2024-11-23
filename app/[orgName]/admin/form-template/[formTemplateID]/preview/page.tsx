import FlatQuestionSet from '@/components/forms/question-sets/flat/flat-question-set'
import LoopQuestionSet from '@/components/forms/question-sets/loop/loop-question-set'
import { TemplateQuestionSetType, TemplateQuestionSetTypes } from '@/lib/types/template'

export default async function TemplatePreviewPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const templateQuestionSets: TemplateQuestionSetType[] = []

  return (
    <>
      {templateQuestionSets.map((questionSet) => {
        // if (questionSet.type === TemplateQuestionSetTypes.LOOP) {
        //   return <LoopQuestionSet key={questionSet.id} questionSet={questionSet} />
        // } else if (questionSet.type === TemplateQuestionSetTypes.FLAT) {
        //   return <FlatQuestionSet key={questionSet.id} questionSet={questionSet} />
        // }
        return null
      })}
    </>
  )
}
