import { fetchApplicationById } from '@/lib/data/application'
import ApplicationCategoriesCardWrapper from './application-categories-card-wrapper'

export default async function ApplicationCategories({
  applicationId,
  className,
}: {
  applicationId: string
  className?: string
}) {
  const application = await fetchApplicationById(applicationId)
  const categories = application?.body?.categories

  return (
    <div className={`${className}`}>
      <ApplicationCategoriesCardWrapper categories={categories} />
    </div>
  )
}
