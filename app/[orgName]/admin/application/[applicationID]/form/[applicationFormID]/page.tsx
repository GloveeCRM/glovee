'use client'

import { useApplicationFormContext } from '@/contexts/application-form-context'

export default function AdminApplicationFormPage() {
  const { rootSelectedFormSectionQuestionSets } = useApplicationFormContext()

  return (
    <div className="h-full p-[16px]">
      tets
      <pre>{JSON.stringify(rootSelectedFormSectionQuestionSets, null, 2)}</pre>
    </div>
  )
}
