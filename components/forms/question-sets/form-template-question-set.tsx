'use client'

import { useEffect, useRef, useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import {
  FormQuestionSetType,
  isStaticQuestionSetType,
  isRepeatableQuestionSetType,
  isConditionalQuestionSetType,
} from '@/lib/types/form'
import { useFormContext } from '@/contexts/form-context'
import useQuestionSetActions from '@/hooks/form-template/use-question-set-actions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import StaticQuestionSetEdit from './flat/static-question-set-edit'
import RepeatableQuestionSetEdit from './repeatable/repeatable-question-set-edit'
import ConditionalQuestionSetEdit from './depends-on/conditional-question-set-edit'

interface FormTemplateQuestionSetProps {
  formQuestionSet: FormQuestionSetType
}

export default function FormTemplateQuestionSet({ formQuestionSet }: FormTemplateQuestionSetProps) {
  const { selectedFormQuestionSetID, setSelectedFormQuestionSetID } = useFormContext()
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const { deleteFormQuestionSet } = useQuestionSetActions()

  const isQuestionSetSelected = selectedFormQuestionSetID === formQuestionSet.formQuestionSetID

  const templateQuestionSetRef = useRef<HTMLDivElement>(null)

  const isStatic = isStaticQuestionSetType(formQuestionSet)
  const isRepeatable = isRepeatableQuestionSetType(formQuestionSet)
  const isConditional = isConditionalQuestionSetType(formQuestionSet)

  function handleClickQuestionSet(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedFormQuestionSetID(formQuestionSet.formQuestionSetID)
  }

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  async function handleClickDeleteQuestionSet() {
    const { error } = await deleteFormQuestionSet({
      formQuestionSetID: formQuestionSet.formQuestionSetID,
    })
    if (error) {
      console.error(error)
    }
    setSelectedFormQuestionSetID(0)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const targetElement = e.target as HTMLElement

      if (targetElement.closest('#templateEditToolbar')) {
        return
      }

      if (
        templateQuestionSetRef.current &&
        !templateQuestionSetRef.current.contains(e.target as Node)
      ) {
        setSelectedFormQuestionSetID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSelectedFormQuestionSetID])

  return (
    <div className="py-[2px]">
      <div
        className={`group/questionSet relative rounded ${isQuestionSetSelected && 'outline outline-2 outline-offset-1 outline-blue-500'}`}
        onClick={handleClickQuestionSet}
        ref={templateQuestionSetRef}
      >
        <DropdownMenu open={isOptionsMenuOpen} onOpenChange={handleOptionsDropdownMenuOpenChange}>
          <DropdownMenuTrigger
            className={`absolute right-[7px] top-[3px] flex h-[10px] items-center rounded-sm text-n-700 opacity-0 transition duration-75 group-hover/questionSet:opacity-100  ${isOptionsMenuOpen && 'opacity-100'}`}
          >
            <FiMoreHorizontal className="h-[20px] w-[20px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-[160px]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleClickDeleteQuestionSet}
                className="flex gap-[6px] focus:text-red-500"
              >
                <BiTrash className="h-[18px] w-[18px]" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {isStatic ? (
          <StaticQuestionSetEdit questionSet={formQuestionSet} />
        ) : isRepeatable ? (
          <RepeatableQuestionSetEdit formQuestionSet={formQuestionSet} />
        ) : isConditional ? (
          <ConditionalQuestionSetEdit formQuestionSet={formQuestionSet} />
        ) : null}
      </div>
    </div>
  )
}
