'use client'

import { useState } from 'react'

import { File } from '@/lib/types/file'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchApplicationAnswerFileUploadIntent } from '@/lib/data/application'
import { saveAnswer } from '@/lib/actions/application'
import { useOrgContext } from '@/contexts/org-context'
import { useApplicationContext } from '@/contexts/application-context'

interface Answer {
  text?: string
  optionIDs?: number[]
  date?: string
  files?: File[]
}

export default function useAnswer(questionID: number, initialAnswer: Answer) {
  const { orgName } = useOrgContext()
  const { applicationID } = useApplicationContext()
  const [answer, setAnswer] = useState<Answer>(initialAnswer)
  const [message, setMessage] = useState<string>('')

  async function updateAnswer(newAnswer: Answer) {
    setMessage('Saving')
    setAnswer(newAnswer)

    saveAnswer({ orgName, questionID, ...newAnswer }).then((data) => {
      setMessage(data.success ? 'Saved!' : 'Failed to save changes!')

      if (data.data.answer.files.length > 0) {
        setAnswer({ ...newAnswer, files: data.data.answer.files })
      }

      setTimeout(() => {
        setMessage('')
      }, 1000)
    })
  }

  async function uploadAnswerFile(file: globalThis.File) {
    setMessage('Uploading')

    const fileToUpload = {
      name: file.name,
      mimeType: file.type,
      size: file.size,
    } as File

    const uploadIntent = await fetchApplicationAnswerFileUploadIntent(
      orgName,
      applicationID,
      questionID,
      fileToUpload
    )
    if (!uploadIntent) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    const uploadRes = await uploadFileToS3(uploadIntent.uploadURL, file)
    if (!uploadRes.success) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    setMessage('Uploaded')
    setTimeout(() => {
      setMessage('')
    }, 1000)
    return uploadIntent.file
  }

  return { answer, message, updateAnswer, uploadAnswerFile }
}