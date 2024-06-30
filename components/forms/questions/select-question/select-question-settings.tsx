'use client'

import { useDebouncedCallback } from 'use-debounce'

import { SelectQuestionType } from '@/lib/types/qusetion'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { FiPlus } from 'react-icons/fi'
import { Separator } from '@/components/ui/separator'
import { BiTrash } from 'react-icons/bi'

interface SelectQuestionSettingsProps {
  question: SelectQuestionType
}

export default function SelectQuestionSettings({ question }: SelectQuestionSettingsProps) {
  const { updateQuestion } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      settings: { ...question.settings, isRequired: isChecked },
    })
  }

  const handleChangeGuide = useDebouncedCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    updateQuestion({
      ...question,
      helperText: value,
    })
  }, 500)

  return (
    <div className="flex flex-col gap-[12px]">
      <div>
        <div className="flex items-center gap-[6px]">
          <Switch checked={question.settings.isRequired} onCheckedChange={handleChangeIsRequired} />
          <div>isRequired</div>
        </div>
        <Separator className="mt-[12px] bg-n-600" />
      </div>
      <div>
        <div className="flex flex-col gap-[6px]">
          <div>Input Options</div>
          <div className="flex flex-col gap-[4px]">
            <div className="flex rounded bg-n-600 px-[6px] py-[6px] text-[12px]">
              <span className="w-full">Op</span>
              <span>
                <BiTrash className="h-[18px] w-[18px] cursor-pointer text-red-500/75 transition-colors duration-150 hover:text-red-500" />
              </span>
            </div>
          </div>
          <AddASelectOptionButton />
        </div>
        <Separator className="mt-[6px] bg-n-600" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div>Guide</div>
        <Textarea
          defaultValue={question.helperText}
          className="rounded-sm border-0 bg-n-600/80 px-[8px] text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangeGuide}
        />
      </div>
    </div>
  )
}

function AddASelectOptionButton() {
  return (
    <div className="my-[6px] flex cursor-pointer items-center gap-[4px] text-[12px]">
      <FiPlus className="h-[18px] w-[18px]" />
      <span>Add an option</span>
    </div>
  )
}
