export default function FormTemplatesContainerSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-[8px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <FormTemplateCardSkeleton />
      <FormTemplateCardSkeleton />
      <FormTemplateCardSkeleton />
      <FormTemplateCardSkeleton />
      <FormTemplateCardSkeleton />
      <FormTemplateCardSkeleton />
    </div>
  )
}

function FormTemplateCardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-[30px] rounded-lg bg-white p-[12px] shadow-sm">
      <div className="mt-[10px] flex flex-col gap-[18px]">
        <div className="bg-sand-400 h-[12px] w-1/2 rounded-lg" />
        <div className="bg-sand-400 h-[8px] w-2/3 rounded-lg" />
      </div>
      <div className="flex justify-end gap-[8px]">
        <div className="bg-sand-400 h-[22px] w-[65px] rounded-lg" />
        <div className="bg-sand-300 h-[22px] w-[60px] rounded-lg" />
      </div>
    </div>
  )
}
