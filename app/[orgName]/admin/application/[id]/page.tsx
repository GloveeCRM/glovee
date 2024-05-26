interface ApplicationPreviewPageProps {
  params: {
    id: number
  }
}

export default async function ApplicationPreviewPage({ params }: ApplicationPreviewPageProps) {
  const applicationId = params.id

  return (
    <div>
      <h1>Application Preview</h1>
      <p>Application ID: {applicationId}</p>
    </div>
  )
}
