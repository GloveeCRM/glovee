'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { BiTrash } from 'react-icons/bi'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'
import { LuFileText } from 'react-icons/lu'

import { DocumentQuestionType } from '@/lib/types/qusetion'
import useAnswer from '@/hooks/application/use-answer'

interface DocumentQuestionProps {
  question: DocumentQuestionType
  readOnly?: boolean
}

export default function DocumentQuestion({ question, readOnly }: DocumentQuestionProps) {
  const { answer, message, updateAnswer, uploadAnswerFile } = useAnswer(
    question.id,
    question.answer || { optionIDs: [] }
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
    const newFiles = currentFiles.filter((f) => f.id !== fileID)

    updateAnswer({ ...answer, files: newFiles })
  }

  function handleClickUploadFile() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-[2px] rounded border-[1px] border-n-300 text-n-500/90">
        {answer.files && answer.files.length > 0 ? (
          answer.files.map((file) => (
            <div
              key={file.id}
              className="flex w-full items-center justify-between gap-[2px] px-[8px] py-[10px]"
            >
              <div className="flex items-center gap-[6px] text-n-600">
                <div className="w-fit rounded-full bg-n-300/70 p-[8px]">
                  <LuFileText className="h-[26px] w-[26px]" />
                </div>
                <Link href={file.presignedDownloadURL} target="_blank">
                  <span className="line-clamp-1">{file.name}</span>
                </Link>
              </div>
              <div
                className="cursor-pointer rounded-full p-[6px] transition duration-75 hover:bg-red-100"
                onClick={() => handleFileDelete(file.id)}
              >
                <BiTrash className="h-[22px] w-[22px] text-red-500" />
              </div>
            </div>
          ))
        ) : (
          <div
            className="flex w-full cursor-pointer flex-col items-center p-[12px] transition duration-75 hover:bg-n-100/50 hover:text-n-600"
            onClick={handleClickUploadFile}
          >
            <FiUpload className="h-[18px] w-[18px]" />
            <div>Upload a File</div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              placeholder={question.type}
              readOnly={readOnly}
              className="hidden"
            />
          </div>
        )}
      </div>
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
