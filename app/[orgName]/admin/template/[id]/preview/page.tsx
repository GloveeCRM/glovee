import { QuestionSet } from '@/app/[orgName]/(client)/applications/[id]/page'
import FlatQuestionSet from '@/components/forms/questionSetType/flat-question-set'
import LoopQuestionSet from '@/components/forms/questionSetType/loop-question-set'
import { fetchTemplateQuestionSetsBySectionId } from '@/lib/data/template'

export default async function TemplatePreviewPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const templateQuestionSets = (await fetchTemplateQuestionSetsBySectionId(
    sectionId
  )) as QuestionSet[]

  return (
    <>
      {templateQuestionSets.map((questionSet) => {
        if (questionSet.type === 'loop') {
          return <LoopQuestionSet key={questionSet.id} questionSet={questionSet} />
        } else if (questionSet.type === 'flat') {
          return <FlatQuestionSet key={questionSet.id} questionSet={questionSet} />
        }
        return null
      })}
    </>
  )
}
