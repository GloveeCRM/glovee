'use client'

import { useDebouncedCallback } from 'use-debounce'

import { DocumentQuestionType } from '@/lib/types/qusetion'
import useQuestionActions from '@/hooks/template/use-question-actions'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface DocumentQuestionSettingsProps {
  question: DocumentQuestionType
}

export default function DocumentQuestionSettings({ question }: DocumentQuestionSettingsProps) {
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
      <div className="flex items-center gap-[6px]">
        <Switch checked={question.settings.isRequired} onCheckedChange={handleChangeIsRequired} />
        <div>isRequired</div>
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[6px]">
        <div>Guide</div>
        <Textarea
          defaultValue={question.helperText}
          className="rounded-sm border-0 bg-n-600/80 text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangeGuide}
        />
      </div>
    </div>
  )
}
