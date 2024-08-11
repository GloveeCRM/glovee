'use client'

import { useDebouncedCallback } from 'use-debounce'

import { TextInputQuestionType } from '@/lib/types/qusetion'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface TextInputQuestionSettingsProps {
  question: TextInputQuestionType
}

export default function TextInputQuestionSettings({ question }: TextInputQuestionSettingsProps) {
  const { updateQuestion } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateQuestion({
      ...question,
      isRequired: isChecked,
    })
  }

  const handleChangePlaceholder = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateQuestion({
      ...question,
      settings: { ...question.settings, placeholder: value },
    })
  }, 500)

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
          <Switch checked={question.isRequired} onCheckedChange={handleChangeIsRequired} />
          <div>isRequired</div>
        </div>
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[6px]">
        <div>Placeholder</div>
        <Input
          defaultValue={question.settings.placeholder}
          className="h-[30px] rounded-sm border-0 bg-n-600/80 px-[8px] text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangePlaceholder}
        />
      </div>
      <Separator className="bg-n-600" />
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
