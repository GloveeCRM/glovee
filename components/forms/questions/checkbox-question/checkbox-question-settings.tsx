'use client'

import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { BiTrash } from 'react-icons/bi'
import { FiEdit2, FiPlus } from 'react-icons/fi'

import { FormQuestionType, FormQuestionOptionType } from '@/lib/types/form'
import { generateRandomID } from '@/lib/utils/id'
import useQuestionActions from '@/hooks/form-template/use-question-actions'

import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface CheckboxQuestionSettingsProps {
  formQuestion: FormQuestionType
}

export default function CheckboxQuestionSettings({ formQuestion }: CheckboxQuestionSettingsProps) {
  const { updateFormQuestionSettings } = useQuestionActions()

  function handleChangeIsRequired(isChecked: boolean) {
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        isRequired: isChecked,
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
                <CheckboxOption
                  key={option.formQuestionOptionID}
                  formQuestion={formQuestion}
                  formQuestionOption={option}
                />
              ))}
            </div>
          )}
          <AddACheckboxOptionButton formQuestion={formQuestion} />
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

interface AddACheckboxOptionButtonProps {
  formQuestion: FormQuestionType
}

function AddACheckboxOptionButton({ formQuestion }: AddACheckboxOptionButtonProps) {
  const { updateFormQuestionSettings } = useQuestionActions()

  function handleAddOption() {
    const options = formQuestion.formQuestionOptions ?? []

    const newOptionID = generateRandomID()
    const newOption = { id: newOptionID, position: options.length, value: 'Option' }

    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        options: [...options, newOption],
      },
    })
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

interface CheckboxOptionProps {
  formQuestion: FormQuestionType
  formQuestionOption: FormQuestionOptionType
}

function CheckboxOption({ formQuestion, formQuestionOption }: CheckboxOptionProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { updateFormQuestionSettings } = useQuestionActions()

  const optionValueInputRef = useRef<HTMLTextAreaElement>(null)

  function handleDeleteOption(optionID: number) {
    updateFormQuestionSettings({
      updatedFormQuestionSettings: {
        ...formQuestion.formQuestionSettings,
        options: formQuestion.formQuestionOptions?.filter(
          (option) => option.formQuestionOptionID !== optionID
        ),
      },
    })
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
      setIsEditing(false)
      updateFormQuestionSettings({
        updatedFormQuestionSettings: {
          ...formQuestion.formQuestionSettings,
          options: formQuestion.formQuestionOptions?.map((o) =>
            o.formQuestionOptionID === formQuestionOption.formQuestionOptionID
              ? { ...o, value: e.currentTarget.value }
              : o
          ),
        },
      })
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  useEffect(() => {
    function handleClickOutsideOption(e: MouseEvent) {
      if (optionValueInputRef.current && !optionValueInputRef.current.contains(e.target as Node)) {
        setIsEditing(false)
        updateFormQuestionSettings({
          updatedFormQuestionSettings: {
            ...formQuestion.formQuestionSettings,
            options: formQuestion.formQuestionOptions?.map((o) =>
              o.formQuestionOptionID === formQuestionOption.formQuestionOptionID
                ? { ...o, value: optionValueInputRef.current?.value }
                : o
            ),
          },
        })
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
