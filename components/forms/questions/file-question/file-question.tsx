'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { BiTrash } from 'react-icons/bi'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'
import { LuDownload, LuFileText } from 'react-icons/lu'

import { FormAnswerFileType, FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'
import AnswerFile from './answer-file'

interface FileQuestionProps {
  formQuestion: FormQuestionType
  mode: 'edit' | 'view'
  readOnly?: boolean
}

export default function FileQuestion({ formQuestion, mode, readOnly }: FileQuestionProps) {
  const { message, updateAnswer, uploadAnswerFile } = useAnswer(formQuestion.formQuestionID)

  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const newFile = await uploadAnswerFile(file)
    if (!newFile) {
      return
    }

    const newAnswerFiles = [
      ...(formQuestion.answer?.answerFiles || []),
      {
        file: newFile,
      } as FormAnswerFileType,
    ]

    updateAnswer({ ...formQuestion.answer, answerFiles: newAnswerFiles })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleFileDelete(fileID: number) {
    const currentFiles = formQuestion.answer?.answerFiles || []
    const newFiles = currentFiles.filter((f) => f.fileID !== fileID)

    updateAnswer({ ...formQuestion.answer, answerFiles: newFiles })
  }

  function handleClickUploadFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return mode === 'edit' ? (
    <div className="relative">
      {formQuestion.answer?.answerFiles && formQuestion.answer?.answerFiles.length > 0 ? (
        formQuestion.answer?.answerFiles.map((file) => (
          <AnswerFile
            key={file.fileID}
            file={file.file!}
            mode="edit"
            onDelete={() => handleFileDelete(file.fileID || 0)}
          />
        ))
      ) : (
        <div
          className={`flex w-full cursor-pointer flex-col items-center rounded-md border border-zinc-400 p-[11px] text-zinc-500 ${!readOnly && 'hover:text-n-500` transition duration-150 hover:border-n-500'}`}
          onClick={handleClickUploadFile}
        >
          <FiUpload className="h-[18px] w-[18px]" />
          <div>Upload a File</div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            placeholder={formQuestion.formQuestionType}
            disabled={readOnly}
            className="hidden"
          />
        </div>
      )}

      {message.length !== 0 && (
        <div
          className={`absolute right-[1px] top-[1px] flex h-[32px] items-center gap-[2px] rounded bg-white px-[4px]
            ${
              message === 'Failed to save changes!' || message === 'Failed to upload file!'
                ? 'text-red-600'
                : 'text-g-700'
            }`}
        >
          {message === 'Saving' ? (
            <ImSpinner2 className="h-[14px] w-[14px] animate-spin" />
          ) : message === 'Saved!' ? (
            <IoMdCheckmarkCircle className="h-[18px] w-[18px]" />
          ) : message === 'Failed to save changes!' ? (
            <IoIosCloseCircle className="h-[18px] w-[18px]" />
          ) : (
            ''
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  ) : (
    <div className="">
      {formQuestion.answer?.answerFiles && formQuestion.answer?.answerFiles.length > 0 ? (
        formQuestion.answer?.answerFiles.map((file) => (
          <AnswerFile key={file.fileID} file={file.file!} mode="view" onDelete={() => {}} />
        ))
      ) : (
        <div className="text-[14px] text-zinc-500">No answer provided</div>
      )}
    </div>
  )
}
