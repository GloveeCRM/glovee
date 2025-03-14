interface AdminSubmittedFormPageParams {
  formID: string
}

interface AdminSubmittedFormPageProps {
  params: AdminSubmittedFormPageParams
}

export default function AdminSubmittedFormPage({ params }: AdminSubmittedFormPageProps) {
  const { formID } = params
  const formIDNumeric = Number(formID)

  return <div>Form ID: {formIDNumeric}</div>
}
