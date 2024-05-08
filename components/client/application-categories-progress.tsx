import { ApplicationCategoryType } from '@/lib/types/application'
import Divider from '../ui/divider'

const objects = [
  { percentage: 10, category: 'Category 1' },
  { percentage: 20, category: 'Category 2' },
  { percentage: 30, category: 'Category 3' },
  { percentage: 40, category: 'Category 4' },
  { percentage: 50, category: 'Category 5' },
  { percentage: 60, category: 'Category 6' },
  { percentage: 70, category: 'Category 7' },
  { percentage: 80, category: 'Category 8' },
]

export default function ApplicationCategoriesProgress({
  categories,
}: {
  categories: ApplicationCategoryType[]
}) {
  if (categories) {
    return (
      <div className="flex justify-center">
        {objects.map((object, index) => (
          <div key={index} className="flex w-full flex-col items-center">
            <div className="flex w-full items-center">
              {index === 0 ? (
                <Divider className="invisible" />
              ) : (
                <Divider size={2} className="border-n-400" />
              )}
              <div className="rounded-full border px-[2px] py-[5px] text-[10px]">
                {object.percentage}%
              </div>
              {index === objects.length - 1 ? (
                <Divider className="invisible" />
              ) : (
                <Divider size={2} className="border-n-400" />
              )}
            </div>
            <div>{object.category}</div>
          </div>
        ))}
      </div>
    )
  } else {
    return <div>No category found</div>
  }
}
