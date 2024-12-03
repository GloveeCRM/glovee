'use client'

import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { BiTrash } from 'react-icons/bi'
import { FiEdit2, FiPlus } from 'react-icons/fi'

import {
  FormQuestionDefaultOptionType,
  FormQuestionDisplayTypes,
  FormQuestionOptionType,
  FormQuestionType,
} from '@/lib/types/form'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface RadioQuestionSettingsProps {
  formQuestion: FormQuestionType
}

export default function RadioQuestionSettings({ formQuestion }: RadioQuestionSettingsProps) {
  const { updateFormQuestionSettings, updateFormQuestionDefaultOptions } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        isRequired: isChecked,
      },
    })
  }

  function handleChangeDefaultOption(e: React.ChangeEvent<HTMLSelectElement>) {
    const formQuestionOptionID = Number(e.target.value)
    const updatedFormQuestionDefaultOptions: Partial<FormQuestionDefaultOptionType>[] = []
    if (formQuestionOptionID !== 0) {
      updatedFormQuestionDefaultOptions.push({
        formQuestionID: formQuestion.formQuestionID,
        formQuestionOptionID,
      })
    }
    updateFormQuestionDefaultOptions({
      formQuestionID: formQuestion.formQuestionID,
      updatedFormQuestionDefaultOptions,
    })
  }

  function handleChangeDisplayType(e: React.ChangeEvent<HTMLSelectElement>) {
    const displayType = e.target.value as FormQuestionDisplayTypes
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        displayType,
      },
    })
  }

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
        <Separator className="mt-[12px] bg-n-600" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[6px]">
          <div>Options</div>
          {formQuestion.formQuestionOptions?.length !== 0 && (
            <div className="flex flex-col gap-[4px]">
              {formQuestion.formQuestionOptions.map((option) => (
                <RadioOption
                  key={option.formQuestionOptionID}
                  formQuestion={formQuestion}
                  formQuestionOption={option}
                />
              ))}
            </div>
          )}
          <AddARadioOptionButton formQuestion={formQuestion} />
        </div>
        <Separator className="mt-[6px] bg-n-600" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div>Default Option</div>
        <div className="flex flex-col gap-[4px] text-[12px]">
          <select
            className="rounded bg-n-600 px-[4px] py-[6px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-n-500"
            onChange={handleChangeDefaultOption}
            defaultValue={String(
              formQuestion.formQuestionDefaultOptions?.[0]?.formQuestionOptionID || 0
            )}
          >
            <option value="0">--Select an option--</option>
            {formQuestion.formQuestionOptions?.map((option) => (
              <option key={option.formQuestionOptionID} value={option.formQuestionOptionID}>
                {option.optionText}
              </option>
            ))}
          </select>
        </div>
        <Separator className="mt-[6px] bg-n-600" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div>Display</div>
        <div className="flex flex-col gap-[4px] text-[12px]">
          <select
            className="rounded bg-n-600 px-[4px] py-[6px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-n-500"
            onChange={handleChangeDisplayType}
            value={formQuestion.formQuestionSettings.displayType || ''}
          >
            <option value="">--Select display type--</option>
            <option value={FormQuestionDisplayTypes.INLINE}>Inline</option>
            <option value={FormQuestionDisplayTypes.BLOCK}>Block</option>
          </select>
        </div>
        <Separator className="mt-[6px] bg-n-600" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div>Guide</div>
        <Textarea
          defaultValue={formQuestion.formQuestionSettings.helperText || ''}
          className="rounded-sm border-0 bg-n-600/80 text-[12px] focus-visible:ring-1 focus-visible:ring-n-500"
          onChange={handleChangeGuide}
        />
      </div>
    </div>
  )
}

interface AddARadioOptionButtonProps {
  formQuestion: FormQuestionType
}

function AddARadioOptionButton({ formQuestion }: AddARadioOptionButtonProps) {
  const { createFormQuestionOption } = useQuestionActions()

  function handleAddOption() {
    const newFormQuestionOption: Partial<FormQuestionOptionType> = {
      formQuestionID: formQuestion.formQuestionID,
      optionText: `Option ${formQuestion.formQuestionOptions.length + 1}`,
      optionPosition: formQuestion.formQuestionOptions.length + 1,
    }

    createFormQuestionOption({ newFormQuestionOption })
  }

  return (
    <div
      className="my-[6px] flex w-fit cursor-pointer items-center gap-[4px] text-[12px]"
      onClick={handleAddOption}
    >
      <FiPlus />
      <div>Add an option</div>
    </div>
  )
}

interface RadioOptionProps {
  formQuestion: FormQuestionType
  formQuestionOption: FormQuestionOptionType
}

function RadioOption({ formQuestion, formQuestionOption }: RadioOptionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { updateFormQuestionOption, deleteFormQuestionOption } = useQuestionActions()

  const optionValueInputRef = useRef<HTMLTextAreaElement>(null)

  function handleDeleteOption(formQuestionOptionID: number) {
    deleteFormQuestionOption({ formQuestionOptionID })
  }

  function handleClickEditValue() {
    setIsEditing(true)
  }

  function adjustTextareaHeight() {
    const textarea = optionValueInputRef.current
    if (textarea) {
      textarea.style.height = '26px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  function handleValueChange() {
    adjustTextareaHeight()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const updatedFormQuestionOption: Partial<FormQuestionOptionType> = {
        ...formQuestionOption,
        optionText: e.currentTarget.value,
      }
      setIsEditing(false)
      updateFormQuestionOption({ updatedFormQuestionOption })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideOption(e: MouseEvent) {
      if (optionValueInputRef.current && !optionValueInputRef.current.contains(e.target as Node)) {
        const updatedFormQuestionOption: Partial<FormQuestionOptionType> = {
          ...formQuestionOption,
          optionText: optionValueInputRef.current?.value,
        }
        setIsEditing(false)
        updateFormQuestionOption({ updatedFormQuestionOption })
      }
    }

    if (isEditing) {
      adjustTextareaHeight()

      const textarea = optionValueInputRef.current
      if (textarea) {
        textarea.focus()

        // move cursor to the end of the text
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideOption)
    return () => document.removeEventListener('mousedown', handleClickOutsideOption)
  }, [formQuestion, formQuestionOption, isEditing])

  return (
    <div className="flex justify-between rounded bg-n-600 text-[12px]">
      <div className="w-full">
        {isEditing ? (
          <div className="px-[2px] py-[3px]">
            <textarea
              ref={optionValueInputRef}
              className="block w-full resize-none overflow-hidden rounded-sm border-[1px] border-dashed border-b-300 bg-n-600 px-[3px] pb-[2px] pt-[2px] focus:border-[1px] focus:border-b-500 focus:outline-none"
              defaultValue={formQuestionOption.optionText}
              onChange={handleValueChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <div className="group/value relative flex justify-between p-[6px]">
            <span>{formQuestionOption.optionText}</span>
            <div
              onClick={handleClickEditValue}
              className="absolute right-[30px] top-[6px] cursor-pointer bg-n-600 p-[2px] opacity-0 transition duration-75 group-hover/value:opacity-100"
            >
              <FiEdit2 className="h-[14px] w-[14px]" />
            </div>
            <span
              onClick={() => handleDeleteOption(formQuestionOption.formQuestionOptionID)}
              className="cursor-pointer text-red-500/75 transition-colors duration-150 hover:text-red-500"
            >
              <BiTrash className="h-[18px] w-[18px]" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
