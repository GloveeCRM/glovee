import Link from 'next/link'
import { HiOutlineEye } from 'react-icons/hi2'

import { dictionary } from '@/lib/constants/dictionary'
import { ApplicationFormType, FormCategoryType } from '@/lib/types/form'

import { Separator } from '@/components/ui/separator'
import ProgressIndicatorRing from '@/components/ui/progress-indicator-ring'

interface ClientApplicationFormSummaryCardProps {
  applicationForm: ApplicationFormType
}

export default function ClientApplicationFormSummaryCard({
  applicationForm,
}: ClientApplicationFormSummaryCardProps) {
  return (
    <div className="flex flex-col gap-[32px] rounded-md border border-sand-500 bg-white p-[10px] text-[14px] shadow-sm">
      <div className="flex items-center justify-between">
        <span>{applicationForm.form.formName}</span>
        <span className="flex-shrink-0 rounded-full bg-coral-100 px-[10px] py-[1px] text-[12px]">
          {dictionary(applicationForm.status)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <ClientApplicationFormSummaryCardCategoriesContainer
          categories={applicationForm.form.categories || []}
        />
      </div>
      <div className="flex justify-end gap-[8px]">
        <Link
          href={`/admin/application/${applicationForm.applicationID}/form/${applicationForm.applicationFormID}`}
          className="flex items-center gap-[4px] rounded-md bg-teal-100 px-[8px] py-[2px] text-teal-900 hover:bg-teal-200"
        >
          <HiOutlineEye className="h-[18px] w-[18px]" />
          <span className="text-[12px]">View</span>
        </Link>
      </div>
    </div>
  )
}

interface ClientApplicationFormSummaryCardCategoriesContainerProps {
  categories: FormCategoryType[]
}

function ClientApplicationFormSummaryCardCategoriesContainer({
  categories,
}: ClientApplicationFormSummaryCardCategoriesContainerProps) {
  return (
    <div className="w-full px-[16px]">
      <div className="flex justify-around">
        {categories.map((category, index) => (
          <ClientApplicationFormSummaryCardCategory
            key={category.formCategoryID}
            category={category}
            isFirstItem={index === 0}
            isLastItem={index === categories.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

interface ClientApplicationFormSummaryCardCategoryProps {
  category: FormCategoryType
  isFirstItem: boolean
  isLastItem: boolean
}

function ClientApplicationFormSummaryCardCategory({
  category,
  isFirstItem,
  isLastItem,
}: ClientApplicationFormSummaryCardCategoryProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center">
        <Separator
          className={`mr-[2px] h-[2px] flex-grow bg-sand-600 ${isFirstItem && 'invisible'}`}
        />
        <div>
          <ProgressIndicatorRing completionRate={category.completionRate} />
        </div>
        <Separator
          className={`ml-[2px] h-[2px] flex-grow bg-sand-600 ${isLastItem && 'invisible'}`}
        />
      </div>
      <div className="line-clamp-2 px-[6px] text-center text-[12px]">{category.categoryName}</div>
    </div>
  )
}
