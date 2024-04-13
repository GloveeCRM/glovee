import { DocumentQuestionType } from '@/lib/types/qusetion'
import { FiUpload } from 'react-icons/fi'

interface DocumentQuestionProps {
  question: DocumentQuestionType
  readOnly?: boolean
}

export default function DocumentQuestion({ question, readOnly }: DocumentQuestionProps) {
  return (
    <div className="flex cursor-default flex-col items-center gap-[2px] rounded-sm border-[1px] border-n-300 p-[4px] text-n-500/90">
      <FiUpload className="h-[18px] w-[18px]" />
      <div>Upload a File</div>
      <input type="file" placeholder={question.type} readOnly={readOnly} hidden />
    </div>
  )
}
