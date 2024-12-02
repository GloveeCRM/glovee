'use client'

import { useDebouncedCallback } from 'use-debounce'

import { FormQuestionType } from '@/lib/types/form'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface TextInputQuestionSettingsProps {
  formQuestion: FormQuestionType
}

export default function TextInputQuestionSettings({
  formQuestion,
}: TextInputQuestionSettingsProps) {
  const { updateFormQuestionSettings } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        isRequired: isChecked,
      },
    })
  }

  const handleChangePlaceholder = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        placeholderText: value,
      },
    })
  }, 500)

  const handleChangeGuide = useDebouncedCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        helperText: value,
      },
    })
  }, 500)

  return (
    <div className="flex flex-col gap-[12px]">
      <div>
        <div className="flex items-center gap-[6px]">
          <Switch
            checked={formQuestion.formQuestionSettings.isRequired}
            onCheckedChange={handleChangeIsRequired}
          />
          <div>isRequired</div>
        </div>
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[6px]">
        <div>Placeholder</div>
        <Input
          defaultValue={formQuestion.formQuestionSettings.placeholderText || ''}
          className="h-[30px] rounded-sm border-0 bg-n-600/80 px-[8px] text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangePlaceholder}
        />
      </div>
      <Separator className="bg-n-600" />
      <div className="flex flex-col gap-[6px]">
        <div>Guide</div>
        <Textarea
          defaultValue={formQuestion.formQuestionSettings.helperText || ''}
          className="rounded-sm border-0 bg-n-600/80 px-[8px] text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangeGuide}
        />
      </div>
    </div>
  )
}
