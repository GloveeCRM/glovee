import { Suspense } from 'react'

import TemplateCardWrapper from '@/components/admin/dashboard/templates/template-card-wrapper'
import { TemplateCardWrapperSkeleton } from '@/components/skeletons'

interface TemplatesPageProps {
  params: {
    orgName: string
  }
}
export default async function TemplatesPage({ params: { orgName } }: TemplatesPageProps) {
  return (
    <div>
      <h1 className="mb-[15px] text-[24px] font-bold">Templates</h1>
      <Suspense fallback={<TemplateCardWrapperSkeleton />}>
        <TemplateCardWrapper orgName={orgName} />
      </Suspense>
    </div>
  )
}
