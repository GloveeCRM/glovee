import { searchForms } from '@/lib/data/form'

interface ApplicationPageParams {
  applicationID: number
}

interface ApplicationPageProps {
  params: {
    applicationID: number
  }
}

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const { applicationID } = params

  const forms = await searchForms({
    filters: { applicationID },
  })

  return (
    <div className="h-full overflow-y-scroll">
      <h1>Application Preview</h1>
      <p>Application ID: {applicationID}</p>
      <pre>{JSON.stringify(forms, null, 2)}</pre>
    </div>
  )
}
