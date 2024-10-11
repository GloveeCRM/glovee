interface AdminApplicationFormPageParams {
  formID: number
}

interface AdminApplicationFormPageProps {
  params: AdminApplicationFormPageParams
}

export default function AdminApplicationFormPage({ params }: AdminApplicationFormPageProps) {
  const formID = params.formID
  return <div>Form ID: {formID}</div>
}
