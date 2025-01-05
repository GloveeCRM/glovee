import Link from 'next/link'
import { HiOutlineEye } from 'react-icons/hi2'

import { dictionary } from '@/lib/constants/dictionary'
import { ApplicationFormType, FormCategoryType } from '@/lib/types/form'

import { Separator } from '@/components/ui/separator'

interface AdminFormSummaryCardProps {
  applicationForm: ApplicationFormType
}

export default function AdminFormSummaryCard({ applicationForm }: AdminFormSummaryCardProps) {
  return (
    <div className="flex flex-col gap-[24px] rounded-md border border-sand-500 bg-white p-[10px] text-[14px] shadow-sm">
      <div className="flex items-center justify-between">
        <span>{applicationForm.form.formName}</span>
        <span className="rounded-full bg-coral-200 px-[8px] py-[1px] text-[12px]">
          {dictionary(applicationForm.status)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <AdminFormSummaryCardCategoriesContainer
          categories={applicationForm.form.categories || []}
        />
      </div>
      <div className="flex justify-end gap-[8px]">
        <Link
          href={`/admin/application/${applicationForm.applicationID}/form/${applicationForm.formID}`}
          className="flex items-center gap-[4px] rounded-md bg-teal-100 px-[8px] py-[2px] text-teal-900 hover:bg-teal-200"
        >
          <HiOutlineEye className="h-[18px] w-[18px]" />
          <span className="text-[12px]">View</span>
        </Link>
      </div>
    </div>
  )
}

interface AdminFormSummaryCardCategoriesContainerProps {
  categories: FormCategoryType[]
}

function AdminFormSummaryCardCategoriesContainer({
  categories,
}: AdminFormSummaryCardCategoriesContainerProps) {
  return (
    <div className="flex w-full items-center justify-around">
      {categories.map((category, index) => (
        <AdminFormSummaryCardCategory
          key={category.formCategoryID}
          category={category}
          isLastItem={index === categories.length - 1}
        />
      ))}
    </div>
  )
}

interface AdminFormSummaryCardCategoryProps {
  category: FormCategoryType
  isLastItem: boolean
}

function AdminFormSummaryCardCategory({ category, isLastItem }: AdminFormSummaryCardCategoryProps) {
  return (
    <div className={`flex items-center ${isLastItem ? '' : 'flex-grow'}`}>
      <span className="text-center text-[12px]">{category.categoryName}</span>
      {!isLastItem && <Separator className="mx-[8px] h-[2px] min-w-[20px] flex-grow bg-sand-600" />}
    </div>
  )
}
