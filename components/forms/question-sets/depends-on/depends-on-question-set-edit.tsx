import { TemplateQuestionSetType } from '@/lib/types/template'
import EmptyQuestionSetDropzone from '../empty-question-set-dropzone'
import TemplateQuestionSet from '../template-question-set'

interface DependsOnQuestionSetEditProps {
  questionSet: TemplateQuestionSetType
  selected: boolean
}

export default function DependsOnQuestionSetEdit({
  questionSet,
  selected = false,
}: DependsOnQuestionSetEditProps) {
  const questionSets = questionSet.questionSets

  return (
    <div
      className={`group/questionSet rounded bg-b-500 ${selected ? 'border-[3px] border-b-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      <div className="rounded border-[1px] border-dashed border-n-500 bg-n-200 p-[4px]">
        <p className="text-[14px]">Question Prompt</p>
        <div className="flex flex-col">
          <div className="flex items-center gap-[4px]">
            <input type="radio" name="dependsOn" value="yes" />
            <label className="text-[12px]">Yes</label>
          </div>
          <div className="flex items-center gap-[4px]">
            <input type="radio" name="dependsOn" value="no" />
            <label className="text-[12px]">No</label>
          </div>
        </div>
      </div>
      <div className="mt-[4px] flex gap-[4px]">
        <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-400">Yes</div>
        <div className="flex h-[30px] w-full items-center justify-center rounded bg-n-600 text-n-100">
          No
        </div>
      </div>

      <div className="mt-[4px]">
        {questionSets && questionSets.length > 0 ? (
          <div className="rounded bg-b-300 px-[4px]">
            {questionSets.map((questionSet) => (
              <TemplateQuestionSet key={questionSet.id} questionSet={questionSet} />
            ))}
          </div>
        ) : (
          <EmptyQuestionSetDropzone questionSet={questionSet} />
        )}
      </div>
    </div>
  )
}
