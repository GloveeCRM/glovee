import { FormType } from '@/lib/types/form'

interface AdminFormSummaryCardProps {
  form: FormType
}

export default function AdminFormSummaryCard({ form }: AdminFormSummaryCardProps) {
  return <pre>{JSON.stringify(form, null, 2)}</pre>
}
