import { FileType } from '@/lib/types/file'
import ApplicationFile from './application-file'

interface ApplicationFilesWrapperProps {
  files: FileType[]
}

export default function ApplicationFilesWrapper({ files }: ApplicationFilesWrapperProps) {
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
          <div className="flex flex-col gap-[12px]">
            {groupedFiles[date].map((file) => (
              <ApplicationFile key={file.fileID} file={file} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
