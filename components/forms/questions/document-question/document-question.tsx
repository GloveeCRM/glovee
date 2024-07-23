'use client'

import { useRef, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'

import { AnswerTypes, AnswerFile, DocumentQuestionType } from '@/lib/types/qusetion'
import { extractS3ObjectKey, uploadFileToS3 } from '@/lib/utils/s3'
import { saveAnswer } from '@/lib/actions/application'
import { fetchApplicationDocumentUploadURL } from '@/lib/data/application'
import { getSessionPayload } from '@/lib/auth/session'
import { useOrgContext } from '@/contexts/org-context'
import { useApplicationContext } from '@/contexts/application-context'

interface DocumentQuestionProps {
  question: DocumentQuestionType
  readOnly?: boolean
}

export default function DocumentQuestion({ question, readOnly }: DocumentQuestionProps) {
  const { orgName } = useOrgContext()
  const { applicationID } = useApplicationContext()
  const [message, setMessage] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    if (!applicationID) {
      return
    }

    setMessage('Uploading')

    const payload = await getSessionPayload()
    const userID = payload?.user.id || 0

    if (!userID) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    const uploadURL = await fetchApplicationDocumentUploadURL(
      orgName,
      userID,
      applicationID,
      question.id,
      file.type
    )
    if (!uploadURL) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    const uploadRes = await uploadFileToS3(uploadURL, file)
    if (!uploadRes.success) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    const objectkey = extractS3ObjectKey(uploadRes.url || '')

    console.log('mime type', file.type)
    saveAnswer(
      orgName,
      question.id,
      {
        files: [
          {
            file: {
              objectKey: objectkey,
              mimeType: file.type,
            },
          } as AnswerFile,
        ],
      },
      AnswerTypes.FILE
    ).then((data) => {
      setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const fileExists =
    question.answer?.answer.files?.length && question.answer.answer.files.length !== 0

  return (
    <div className="relative">
      {fileExists ? (
        <a
          href={question.answer?.answer.files?.[0].file.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[2px] text-blue-500 hover:text-blue-700"
        >
          <IoMdCheckmarkCircle className="h-[18px] w-[18px]" />
          Open Document
        </a>
      ) : (
        <div className="flex flex-col items-center gap-[2px] rounded-sm border-[1px] border-n-300 p-[4px] text-n-500/90">
          <FiUpload className="h-[18px] w-[18px]" />
          <div>Upload a File</div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            placeholder={question.type}
            readOnly={readOnly}
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
