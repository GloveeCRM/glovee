'use client'

import { useEffect, useRef, useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiTrash } from 'react-icons/bi'

import { TemplateQuestionSetType, TemplateQuestionSetTypes } from '@/lib/types/template'
import { useTemplateEditContext } from '@/contexts/template-edit-context'
import useQuestionSetActions from '@/hooks/template/use-question-set-actions'
import NonEmptySectionDropzone from '@/components/admin/template/edit/non-empty-section-dropzone'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import FlatQuestionSetEdit from './flat/flat-question-set-edit'
import LoopQuestionSetEdit from './loop/loop-question-set-edit'
import DependsOnQuestionSetEdit from './depends-on/depends-on-question-set-edit'

interface TemplateQuestionSetProps {
  questionSet: TemplateQuestionSetType
}

export default function TemplateQuestionSet({ questionSet }: TemplateQuestionSetProps) {
  const { selectedQuestionSetID, setSelectedQuestionSetID } = useTemplateEditContext()
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)
  const { removeQuestionSetFromSection } = useQuestionSetActions()

  const isQuestionSetSelected = selectedQuestionSetID === questionSet.id

  const templateQuestionSetRef = useRef<HTMLDivElement>(null)

  const questions = questionSet.questions || []

  const isFlat = questionSet.type === TemplateQuestionSetTypes.FLAT
  const isLoop = questionSet.type === TemplateQuestionSetTypes.LOOP
  const isDependsOn = questionSet.type === TemplateQuestionSetTypes.DEPENDS_ON

  function handleClickQuestionSet(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    setSelectedQuestionSetID(questionSet.id)
  }

  function handleOptionsDropdownMenuOpenChange(isOpen: boolean) {
    setIsOptionsMenuOpen(isOpen)
  }

  function handleClickDeleteQuestionSet() {
    removeQuestionSetFromSection(questionSet.id)
    setSelectedQuestionSetID(0)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        templateQuestionSetRef.current &&
        !templateQuestionSetRef.current.contains(e.target as Node)
      ) {
        setSelectedQuestionSetID(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setSelectedQuestionSetID])

  const showDropzoneBefore = questionSet.position === 0

  return (
    <div className="py-[2px]">
      {showDropzoneBefore && (
        <NonEmptySectionDropzone position={questionSet.position} questionSet={questionSet} />
      )}
      <div
        className="group/questionSet relative rounded"
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
        {isFlat ? (
          <FlatQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : isLoop ? (
          <LoopQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : isDependsOn ? (
          <DependsOnQuestionSetEdit questionSet={questionSet} selected={isQuestionSetSelected} />
        ) : null}
      </div>
      <NonEmptySectionDropzone position={questionSet.position + 1} questionSet={questionSet} />
    </div>
  )
}
