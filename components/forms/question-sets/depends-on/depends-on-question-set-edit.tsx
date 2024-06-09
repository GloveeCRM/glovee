'use client'

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
  const question = questionSet.questions?.[0]
  const isInline = question?.settings?.display === 'inline'
  const options = question?.settings?.options || []

  return (
    <div
      className={`group/questionSet rounded bg-b-500 ${selected ? 'border-[3px] border-b-700 p-[5px] pt-[13px]' : 'p-[8px] pt-[16px]'}`}
    >
      <div className="rounded bg-n-200 p-[8px]">
        <p className="mb-[8px] text-[14px]">{question?.prompt || 'Untitled Question'}</p>
        <div className={`flex ${isInline ? 'gap-[12px]' : 'flex-col gap-[2px]'}`}>
          {options.map((option: any) => (
            <div key={option.value} className="flex items-center gap-[4px]">
              <input type="radio" name="dependsOn" value={option.value} />
              <label className="text-[12px]">{option.value}</label>
            </div>
          ))}
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
