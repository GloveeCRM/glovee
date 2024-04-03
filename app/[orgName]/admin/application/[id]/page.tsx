import { fetchApplicationById } from '@/lib/data/application'
import { notFound } from 'next/navigation'

interface ApplicationPreviewPageProps {
  params: {
    id: string
  }
}

export default async function ApplicationPreviewPage({ params }: ApplicationPreviewPageProps) {
  const applicationId = params.id
  const application = await fetchApplicationById(applicationId)

  if (!application) {
    notFound()
  }

  return (
    <div>
      {application.categories.map((category) =>
        category.sections.map((section) =>
          section.questionSets.map((questionSet) => (
            <div key={questionSet.id}>
              {questionSet.questions.map((question) => (
                <div key={question.id}>
                  <p>{question.prompt}</p>
                  <p>{question.helperText}</p>
                </div>
              ))}
            </div>
          ))
        )
      )}
    </div>
  )
}
