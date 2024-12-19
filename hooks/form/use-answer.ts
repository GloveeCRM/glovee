'use client'

import { useState } from 'react'

import { FileType } from '@/lib/types/file'
import { FormAnswerType } from '@/lib/types/form'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { fetchFormAnswerFileUploadURL } from '@/lib/data/form'
import { upsertFormAnswer } from '@/lib/actions/form'
import { useApplicationFormContext } from '@/contexts/application-form-context'

export default function useAnswer(formQuestionID: number) {
  const { setFormQuestionAnswer } = useApplicationFormContext()
  const [message, setMessage] = useState<string>('')

  async function updateAnswer(newAnswer: Partial<FormAnswerType>) {
    setMessage('Saving')
    newAnswer.formQuestionID = formQuestionID

    const { formAnswer, error } = await upsertFormAnswer({ formAnswer: newAnswer })
    setMessage(!error ? 'Saved!' : 'Failed to save changes!')

    setFormQuestionAnswer(formQuestionID, formAnswer)

    setTimeout(() => {
      setMessage('')
    }, 1000)
  }

  async function uploadAnswerFile(file: globalThis.File) {
    setMessage('Uploading')

    const { url, objectKey, error } = await fetchFormAnswerFileUploadURL({
      formQuestionID,
      fileName: file.name,
      mimeType: file.type,
    })
    if (!url) {
      setMessage('Failed to upload file!')
      setTimeout(() => {
        setMessage('')
      }, 1000)
      return
    }

    const uploadRes = await uploadFileToS3(url, file)
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

    const uploadedFile = {
      name: file.name,
      mimeType: file.type,
      size: file.size,
      objectKey,
    } as FileType

    return uploadedFile
  }

  return { message, updateAnswer, uploadAnswerFile }
}
