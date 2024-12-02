'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { BiTrash } from 'react-icons/bi'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'
import { LuDownload, LuFileText } from 'react-icons/lu'

import { FormQuestionType } from '@/lib/types/form'
import useAnswer from '@/hooks/form/use-answer'

interface FileQuestionProps {
  formQuestion: FormQuestionType
  readOnly?: boolean
}

export default function FileQuestion({ formQuestion, readOnly }: FileQuestionProps) {
  const { answer, message, updateAnswer, uploadAnswerFile } = useAnswer(
    formQuestion.formQuestionID,
    formQuestion.answer || { optionIDs: [] }
  )

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

    const newFiles = [...(answer.files || []), newFile]
    updateAnswer({ ...answer, files: newFiles })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function handleFileDelete(fileID: number) {
    const currentFiles = answer.files || []
    const newFiles = currentFiles.filter((f) => f.fileID !== fileID)

    updateAnswer({ ...answer, files: newFiles })
  }

  function handleClickUploadFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="relative">
      {answer.files && answer.files.length > 0 ? (
        answer.files.map((file) => (
          <div
            key={file.fileID}
            className="flex w-full items-center justify-between gap-[2px] rounded-[3px] border border-n-400 px-[8px] py-[10px]"
          >
            <div className="flex items-center gap-[6px] text-n-600">
              <div className="w-fit rounded-full bg-n-300/70 p-[8px]">
                <LuFileText className="h-[26px] w-[26px]" />
              </div>
              <span className="line-clamp-1">{file.name}</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div>
                <Link href={file.url} target="_blank">
                  <span className="flex items-center gap-[4px] rounded-full bg-n-200 px-[8px] py-[2px] text-n-600 transition duration-75 hover:bg-n-300 hover:text-n-800">
                    <LuDownload className="h-[16px] w-[16px]" />
                    <span>Download</span>
                  </span>
                </Link>
              </div>
              <div
                className="cursor-pointer rounded-full p-[6px] transition duration-75 hover:bg-red-100"
                onClick={() => handleFileDelete(file.fileID)}
              >
                <BiTrash className="h-[22px] w-[22px] text-red-500" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className={`flex w-full cursor-pointer flex-col items-center gap-[1px] rounded-[3px] border border-n-400 p-[11px] text-n-450 ${!readOnly && 'hover:text-n-500` transition duration-150 hover:border-n-500'}`}
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
  )
}
