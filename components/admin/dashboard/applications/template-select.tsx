'use client'

import { FormInput, InputLabel } from '@/components/ui/inputs'
import { Select } from '@/components/ui/select'
import { useOrgContext } from '@/contexts/org-context'
import { searchTemplates } from '@/lib/data/template'
import { TemplateType } from '@/lib/types/template'
import { useEffect, useState } from 'react'

interface TemplateSelectProps {
  errors?: string
}

export default function TemplateSelect({ errors }: TemplateSelectProps) {
  const { orgName } = useOrgContext()
  const [templates, setTemplates] = useState<TemplateType[]>([])

  useEffect(() => {
    searchTemplates(orgName).then((res) => {
      setTemplates(res)
    })
  }, [orgName])

  const options = templates.map((template) => ({
    id: template.id,
    value: template.id,
    name: template.name,
  }))

  return (
    <div>
      <FormInput errors={errors} gap="sm">
        <InputLabel htmlFor="templateId">Select a template</InputLabel>
        <Select id="template" name="templateID" options={options} />
      </FormInput>
    </div>
  )
}
