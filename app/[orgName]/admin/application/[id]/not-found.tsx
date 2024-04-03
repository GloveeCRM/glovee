import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested Application.</p>
      <Link href="/admin/applications">Back to Applications</Link>
    </div>
  )
}
