import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      <div className="w-[250px] rounded border border-dashed border-n-800 bg-n-300 p-[10px] text-center">
        <Link href="/create-new-organization">Create a New Organization</Link>
      </div>
    </div>
  )
}
