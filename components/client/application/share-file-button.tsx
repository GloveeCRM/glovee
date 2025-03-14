'use client'

import { useRef } from 'react'

import { uploadFileToS3 } from '@/lib/utils/s3'
import { createApplicationFile } from '@/lib/actions/application'

import { Button } from '@/components/ui/button'
import { fetchPresignedPutURL } from '@/lib/data/s3'

interface ShareFileButtonProps {
  applicationID: number
}

export default function ShareFileButton({ applicationID }: ShareFileButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleShareFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    const {
      url,
      objectKey,
      error: uploadURLDataError,
    } = await fetchPresignedPutURL({
      fileName: file.name,
      mimeType: file.type,
      purpose: 'application_file',
      expiresIn: 3600,
      parentEntityID: applicationID,
    })

    if (uploadURLDataError) {
      console.error(uploadURLDataError)
      return
    }

    if (!url) {
      console.error('No upload URL received')
      return
    }

    const uploadRes = await uploadFileToS3(url, file)
    if (!uploadRes.success) {
      console.error('Failed to upload file to S3')
      return
    }

    const { error: createApplicationFileError } = await createApplicationFile({
      applicationID,
      objectKey: objectKey || '',
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    })
    if (createApplicationFileError) {
      console.error(createApplicationFileError)
      return
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleShareFile}
      />
      <Button onClick={() => fileInputRef.current?.click()}>Share File</Button>
    </>
  )
}
