'use client'

import { useState } from 'react'

import { FileType } from '@/lib/types/file'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchFormAnswerFileUploadIntent } from '@/lib/data/form'
import { upsertFormAnswer } from '@/lib/actions/form'
import { useAuthContext } from '@/contexts/auth-context'
import { useApplicationFormContext } from '@/contexts/application-form-context'
import { FormAnswerType } from '@/lib/types/form'

export default function useAnswer(formQuestionID: number, initialAnswer: FormAnswerType) {
  const { sessionUserID } = useAuthContext()
  const { applicationFormID: formID } = useApplicationFormContext()
  const [answer, setAnswer] = useState<Partial<FormAnswerType>>(initialAnswer)
  const [message, setMessage] = useState<string>('')

  async function updateAnswer(newAnswer: Partial<FormAnswerType>) {
    setMessage('Saving')
    setAnswer(newAnswer)

    upsertFormAnswer({ formAnswer: newAnswer }).then((data) => {
      const { formAnswer, error } = data
      setMessage(!error ? 'Saved!' : 'Failed to save changes!')

      if (formAnswer?.answerFiles && formAnswer.answerFiles.length > 0) {
        setAnswer({ ...newAnswer, answerFiles: formAnswer.answerFiles })
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
    } as FileType

    const uploadIntent = await fetchFormAnswerFileUploadIntent(
      sessionUserID || 0,
      formID,
      formQuestionID,
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
