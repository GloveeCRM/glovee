import { ApplicationCategoryType } from '@/lib/types/application'
import Divider from '../ui/divider'

const percentages = [20, 20, 20, 20, 20, 20, 20, 20]

export default function ApplicationCategoriesProgress({
  categories,
}: {
  categories: ApplicationCategoryType[]
}) {
  if (categories) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between">
          {percentages.map((percentage, index) => (
            <div key={index} className="w-full">
              <div className="flex items-center text-[10px]">
                <div className="rounded-full border border-n-300 px-[2px] py-[5px]">
                  {percentage}%
                </div>
                {index < percentages.length - 1 && <Divider size={2} className="border-n-400" />}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 flex">
          {categories.map((category) => (
            <div key={category.id} className="w-20 text-center text-[10px] text-n-700">
              {category.title}
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return <div>No category found</div>
  }
}
