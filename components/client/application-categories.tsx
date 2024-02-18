import { fetchCategorieByApplicationId } from '@/lib/data/application'
import ApplicationCategoriesCardWrapper from './application-categories-card-wrapper'

export interface Category {
  id: string
  title: string
  position: number
  sections: Section[]
}

export interface Section {
  id: string
  title: string
  position: number
}

export default async function ApplicationCategories({ applicationId }: { applicationId: string }) {
  const categories = (await fetchCategorieByApplicationId(applicationId)) as Category[]

  return (
    <div className="h-full">
      <ApplicationCategoriesCardWrapper categories={categories} />
    </div>
  )
}
