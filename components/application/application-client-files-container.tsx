import { FaClipboardList } from 'react-icons/fa6'

import { FileType } from '@/lib/types/file'
import { fetchApplicationFilesByClient } from '@/lib/data/application'

import ApplicationFile from './application-file'

interface ApplicationClientFilesContainerProps {
  applicationID: number
}

export default async function ApplicationClientFilesContainer({
  applicationID,
}: ApplicationClientFilesContainerProps) {
  const { files, error } = await fetchApplicationFilesByClient({ applicationID })
  if (error) {
    console.error(error)
  }

  if (!files || files.length === 0) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-[24px]">
        <span className="text-center text-[18px] text-zinc-500">
          Client has not uploaded any files yet
        </span>
        <FaClipboardList className="h-[300px] w-[300px] text-zinc-700/10" />
      </div>
    )
  }

  const groupedFiles = files.reduce(
    (acc, file) => {
      const date = new Date(file.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      acc[date] = acc[date] || []
      acc[date].push(file)
      return acc
    },
    {} as Record<string, FileType[]>
  )

  const sortedGroupedFiles = Object.keys(groupedFiles).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className="flex flex-col gap-[36px]">
      {sortedGroupedFiles.map((date) => (
        <div key={date} className="flex flex-col gap-[16px]">
          <div className="">{date}</div>
          <div className="flex flex-col gap-[12px] px-[8px]">
            {groupedFiles[date].map((file) => (
              <ApplicationFile key={file.fileID} file={file} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
