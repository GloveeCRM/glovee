import { ApplicationCategoryType } from '@/lib/types/application'
import Divider from '../ui/divider'
import ProgressBar from './progress-bar'

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
  categories: { name: string; completionRate: number }[]
}) {
  if (categories) {
    return <ProgressBar objects={objects} />
  } else {
    return <div>No category found</div>
  }
}
