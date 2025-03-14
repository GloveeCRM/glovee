'use client'

import { useEffect, useState } from 'react'

import { FileType } from '@/lib/types/file'
import { fetchPresignedGetURL } from '@/lib/data/s3'

interface UseFileProps {
  file: FileType
  expiresIn?: number
}

export default function useFile({
  file,
  expiresIn = 60 * 60 * 2, // 2 hours
}: UseFileProps) {
  const [fileWithUrl, setFileWithUrl] = useState<FileType>(file)

  useEffect(() => {
    async function fetchFile() {
      const { url } = await fetchPresignedGetURL({
        fileID: file.fileID,
        expiresIn,
      })
      setFileWithUrl({ ...file, url })
    }
    fetchFile()
  }, [file])

  return { fileWithUrl }
}
