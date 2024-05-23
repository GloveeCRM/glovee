import { ApplicationCategoryType } from '@/lib/types/application'
import ApplicationCardCategorySummary from './application-card-category-summary'

interface ApplicationCardCategorySummariesWrapperProps {
  categorySummaries: ApplicationCategoryType[]
}

export default function ApplicationCardCategorySummariesWrapper({
  categorySummaries,
}: ApplicationCardCategorySummariesWrapperProps) {
  return (
    <div className="flex justify-center">
      {categorySummaries.map((categorySummary, index) => (
        <ApplicationCardCategorySummary
          key={categorySummary.id}
          name={categorySummary.name}
          completionRate={categorySummary.completionRate}
          showLeftDivider={index !== 0}
          showRightDivider={index !== categorySummaries.length - 1}
        />
      ))}
    </div>
  )
}
