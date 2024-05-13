import { QuestionSet } from '@/app/[orgName]/(client)/application/[id]/page'
import FlatQuestionSet from '@/components/forms/question-sets/flat/flat-question-set'
import LoopQuestionSet from '@/components/forms/question-sets/loop/loop-question-set'
import { fetchTemplateQuestionSetsWithQuestionsBySectionId } from '@/lib/data/template'

export default async function TemplatePreviewPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const templateQuestionSets = (await fetchTemplateQuestionSetsWithQuestionsBySectionId(
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
