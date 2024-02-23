import Link from 'next/link'

interface HomePagePrarams {
  domain: string
}

export default function HomePage({ params }: { params: HomePagePrarams }) {
  return (
    <div>
      <h1>Welcome to {params.domain}</h1>
      <div className="flex w-[200px] gap-[10px]">
        <Link href={`/admin/templates`} className="w-full">
          <div className="rounded border border-n-400 bg-n-200 p-[10px] text-center">Admin</div>
        </Link>
        <Link href={`/applications`} className="w-full">
          <div className="rounded border border-n-400 bg-n-200 p-[10px] text-center">Client</div>
        </Link>
      </div>
    </div>
  )
}
