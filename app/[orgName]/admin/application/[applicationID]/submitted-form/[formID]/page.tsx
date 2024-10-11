interface AdminSubmittedFormPageParams {
  formID: number
}

interface AdminSubmittedFormPageProps {
  params: AdminSubmittedFormPageParams
}

export default function AdminSubmittedFormPage({ params }: AdminSubmittedFormPageProps) {
  const formID = params.formID
  return <div>Form ID: {formID}</div>
}
