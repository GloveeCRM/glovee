import { fetchQuestionSetsBySectionId } from '@/lib/data/application'
import { ApplicationQuestionSetType } from '@/lib/types/application'

export interface QuestionSet {
  id: string
  type: string
  position: number
  questions: Question[]
}

export interface Question {
  id: string
  prompt: string
  helperText?: string
  position: number
  type: string
  answer?: Answer
}

export interface Answer {
  id: string
  text: string
  questionId: string
}

const applicationQuestionSets = [
  {
    id: 'clwcpnpde0004hy7g3u064v77',
    type: 'FLAT',
    position: 0,
    sectionId: 'clwcpnpde0003hy7g1t9qfaum',
    questionSetId: null,
    questions: [
      {
        id: 'clwcpnpde0005hy7gn753phvl',
        type: 'TEXT_INPUT',
        prompt: 'name',
        position: 0,
        helperText: 'No helper text',
        settings: {},
        questionSetId: 'clwcpnpde0004hy7g3u064v77',
      },
    ],
  },
  {
    id: 'clwcpnpde0006hy7gqetldv4q',
    type: 'LOOP',
    position: 1,
    sectionId: 'clwcpnpde0003hy7g1t9qfaum',
    questionSetId: null,
    questions: [],
    questionSets: [
      {
        id: 'clwcpnpde0007hy7ghbzhedng',
        type: 'LOOP',
        position: 0,
        sectionId: 'clwcpnpde0003hy7g1t9qfaum',
        questionSetId: 'clwcpnpde0006hy7gqetldv4q',
        questions: [],
        questionSets: [
          {
            id: 'clwcpnpdf0008hy7ggzqdt9bf',
            type: 'FLAT',
            position: 0,
            sectionId: 'clwcpnpde0003hy7g1t9qfaum',
            questionSetId: 'clwcpnpde0007hy7ghbzhedng',
            questions: [
              {
                id: 'clwcpnpdf0009hy7g2yg0effp',
                type: 'TEXT_INPUT',
                prompt: 'job title in the company',
                position: 0,
                helperText: 'No helper text',
                settings: {},
                questionSetId: 'clwcpnpdf0008hy7ggzqdt9bf',
              },
            ],
          },
          {
            id: 'clwcpnpdf000ahy7g2fn3czm7',
            type: 'FLAT',
            position: 1,
            sectionId: 'clwcpnpde0003hy7g1t9qfaum',
            questionSetId: 'clwcpnpde0007hy7ghbzhedng',
            questions: [
              {
                id: 'clwcpnpdf000bhy7g644o960a',
                type: 'TEXT_INPUT',
                prompt: 'company name',
                position: 0,
                helperText: 'No helper text',
                settings: {},
                questionSetId: 'clwcpnpde0006hy7gqetldv4q',
              },
            ],
          },
        ],
      },
    ],
  },
] as ApplicationQuestionSetType[]

export default async function ClientApplicationPage({
  searchParams,
}: {
  searchParams: { section?: string }
}) {
  const sectionId = searchParams.section || ''
  const questionSets = (await fetchQuestionSetsBySectionId(
    sectionId
  )) as ApplicationQuestionSetType[]

  return (
    <div>
      {applicationQuestionSets.map((questionSet) => (
        <div key={questionSet.id}>
          <h2>{questionSet.type}</h2>
        </div>
      ))}
    </div>
  )
}
