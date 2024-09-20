import { FormCategoryType } from '@/lib/types/form'
import FormCardCategorySummary from './form-card-category-summary'

interface FormCardCategorySummariesWrapperProps {
  categorySummaries: FormCategoryType[]
}

export default function FormCardCategorySummariesWrapper({
  categorySummaries,
}: FormCardCategorySummariesWrapperProps) {
  return (
    <div className="flex justify-center">
      {categorySummaries.map((categorySummary, index) => (
        <FormCardCategorySummary
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
