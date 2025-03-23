'use client'

import { useState } from 'react'

import { FileType } from '@/lib/types/file'
import { FormAnswerType } from '@/lib/types/form'
import { uploadFileToS3 } from '@/lib/utils/s3'
import { upsertFormAnswer } from '@/lib/actions/form'
import { fetchPresignedPutURL } from '@/lib/data/s3'
import { useFormContext } from '@/contexts/form-context'

export default function useAnswer(formQuestionID: number) {
  const { setFormQuestionAnswer } = useFormContext()
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

    const { url, objectKey } = await fetchPresignedPutURL({
      fileName: file.name,
      mimeType: file.type,
      purpose: 'form_answer_file',
      expiresIn: 3600,
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
