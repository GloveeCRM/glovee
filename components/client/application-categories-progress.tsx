import { ApplicationCategoryType } from '@/lib/types/application'

const percentages = [20, 20, 20]

export default function ApplicationCategoriesProgress({
  categories,
}: {
  categories: ApplicationCategoryType[]
}) {
  if (categories) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-4">
          {percentages.map((percentage, index) => (
            <div key={index} className="flex h-8 w-20 items-center justify-center  text-[10px]">
              <div className="rounded-full border px-[2px] py-[5px]">{percentage}%</div>
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-center space-x-4">
          {categories.map((category: any) => (
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
