import Link from 'next/link'

import { FileType } from '@/lib/types/file'

interface ApplicationFileProps {
  file: FileType
}

export default function ApplicationFile({ file }: ApplicationFileProps) {
  return (
    <div className="flex justify-between rounded-md border border-gray-300 p-[12px]">
      <div>{file.name}</div>
      <div>
        <Link href={file.url} target="_blank">
          Download
        </Link>
      </div>
    </div>
  )
}
