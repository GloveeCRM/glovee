import Link from 'next/link'

import { FileType } from '@/lib/types/file'
import { FaDownload, FaFile } from 'react-icons/fa6'
import { BiTrash } from 'react-icons/bi'

interface AnswerFileProps {
  file: FileType
  mode: 'view' | 'edit'
  onDelete: () => void
}

export default function AnswerFile({ file, mode, onDelete }: AnswerFileProps) {
  return (
    <div className="flex items-center justify-between gap-[12px] rounded-md border border-sand-500 bg-white p-[10px] text-[14px] shadow-sm">
      <div className="flex items-center gap-[12px]">
        <div className="rounded bg-sand-500 p-[6px]">
          <FaFile className="h-[27px] w-[27px] text-sand-800" />
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[14px] font-medium">{file.name}</span>
          <span className="text-[12px] text-zinc-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <Link
          href={file.url || '/404'}
          target="_blank"
          className="flex items-center gap-[4px] rounded-full bg-sand-450 p-[10px] text-sand-900 hover:text-zinc-700"
        >
          <FaDownload className="h-[20px] w-[20px]" />
        </Link>
        {mode === 'edit' && (
          <div
            className="flex cursor-pointer items-center gap-[4px] rounded-full bg-sand-450 p-[10px] text-sand-900 hover:bg-red-100 hover:text-red-700"
            onClick={onDelete}
          >
            <BiTrash className="h-[20px] w-[20px]" />
          </div>
        )}
      </div>
    </div>
  )
}
