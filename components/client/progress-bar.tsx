import Divider from '../ui/divider'

export default function ProgressBar({
  objects,
}: {
  objects: { percentage: number; category: string }[]
}) {
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
}
