import Link from 'next/link'
import { BsDot } from 'react-icons/bs'
import { LuDownload, LuFileText } from 'react-icons/lu'

import { FileType } from '@/lib/types/file'
import { FormQuestionSetType } from '@/lib/types/form'
import {
  CheckboxQuestionOptionType,
  isCheckboxQuestionType,
  isDateInputQuestionType,
  isDocumentQuestionType,
  isRadioQuestionType,
  isSelectQuestionType,
  isTextareaQuestionType,
  isTextInputQuestionType,
  QuestionType,
  RadioQuestionOptionType,
  SelectQuestionOptionType,
} from '@/lib/types/qusetion'
import { fetchFormQuestionSets } from '@/lib/data/form'
import { getSessionPayload } from '@/lib/auth/session'
import { Separator } from '@/components/ui/separator'

export default async function ClientSubmissionPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const payload = await getSessionPayload()
  const clientID = payload?.user?.id || 0
  const sectionID = parseInt(searchParams.section || '0')
  const questionSets = await fetchFormQuestionSets({
    filters: {
      userID: clientID,
      sectionID: sectionID,
      includeQuestions: true,
      includeAnswers: true,
    },
  })

  const questions = extractQuestionsFromQuestionSets(questionSets)

  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll p-[8px]">
      {questions.length > 0 ? (
        <div className="rounded-lg border border-n-400 px-[12px] text-[14px]">
          {questions.map((question, i) => (
            <div key={question.id}>
              <div key={question.id} className="grid grid-cols-3 gap-[24px] py-[16px]">
                <div className="font-light text-black">{question.prompt}</div>
                <div className="col-span-2 font-light text-n-500">
                  {question.answer?.isAcceptable ? (
                    <Answer question={question} />
                  ) : (
                    <div className="text-n-500/70">No answer provided</div>
                  )}
                </div>
              </div>
              {i < questions.length - 1 && <Separator className="bg-n-300" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-n-500">No questions found</div>
      )}
    </div>
  )
}

function Answer({ question }: { question: QuestionType }) {
  if (isTextInputQuestionType(question) || isTextareaQuestionType(question)) {
    return <div>{question.answer?.text}</div>
  } else if (
    isRadioQuestionType(question) ||
    isCheckboxQuestionType(question) ||
    isSelectQuestionType(question)
  ) {
    const options = question.options || []
    const answerOptionIDs = question.answer?.optionIDs || []
    const answerOptions = options.filter((option) => answerOptionIDs.includes(option.id))
    return <OptionAnswers options={answerOptions} />
  } else if (isDateInputQuestionType(question)) {
    return <DateAnswer date={question.answer?.date || ''} />
  } else if (isDocumentQuestionType(question)) {
    return <FilesAnswer files={question.answer?.files || []} />
  } else {
    return <div>Unknown question type</div>
  }
}

function FilesAnswer({ files }: { files: FileType[] }) {
  return (
    <div className="flex flex-col gap-[8px]">
      {files.map((file) => (
        <div
          className="flex w-full items-center justify-between gap-[2px] rounded-[3px] border border-n-400 px-[8px] py-[10px]"
          key={file.fileID}
        >
          <div className="flex items-center gap-[6px] text-n-600">
            <div className="w-fit rounded-full bg-n-300/70 p-[8px]">
              <LuFileText className="h-[22px] w-[22px]" />
            </div>
            <span className="line-clamp-1">{file.name}</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <Link href={file.url} target="_blank">
              <span className="flex items-center gap-[4px] rounded-full bg-n-200 px-[8px] py-[2px] text-n-600 transition duration-75 hover:bg-n-300 hover:text-n-800">
                <LuDownload className="h-[16px] w-[16px]" />
                <span>Download</span>
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

function DateAnswer({ date }: { date: string }) {
  if (!date) {
    return null
  }

  const dateObj = new Date(date)
  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const year = dateObj.getFullYear()
  return <div>{`${day} / ${month} / ${year}`}</div>
}

function OptionAnswers({
  options,
}: {
  options: RadioQuestionOptionType[] | CheckboxQuestionOptionType[] | SelectQuestionOptionType[]
}) {
  return (
    <div>
      <ul>
        {options.map((option) => (
          <li key={option.id} className="flex gap-[2px]">
            <BsDot className="h-[22px] w-[22px]" />
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

function extractQuestionsFromQuestionSets(questionSets: FormQuestionSetType[]) {
  const questions: QuestionType[] = []
  questionSets.forEach((qset) => {
    qset.questions?.forEach((q) => {
      questions.push(q)
    })

    const qs = extractQuestionsFromQuestionSets(qset.questionSets || [])
    questions.push(...qs)
  })
  return questions
}
