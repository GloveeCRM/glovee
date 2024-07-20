'use client'

import { useRef, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'
import { FiUpload } from 'react-icons/fi'

import { DocumentQuestionType } from '@/lib/types/qusetion'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { useApplicationContext } from '@/contexts/application-context'
import { fetchApplicationDocumentUploadURL } from '@/lib/data/application'
import { getSessionPayload } from '@/lib/auth/session'

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

    saveAnswer(orgName, question.id, { files: [uploadRes.url || ''] }).then((data) => {
      setMessage(data.success ? 'Saved!' : 'Failed to save changes!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="relative">
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
